import { FIREBASE_AUTH } from '@common/providers/firebase'
import { saveLocalUserContext, setUserContext } from '@contexts/user/userContext'
import { UserCredential, signInWithCustomToken, signInWithEmailAndPassword } from 'firebase/auth'

type EmailCredentials = { provider: 'email'; email: string; password: string }
type TokenCredentials = { provider: 'token'; token: string }

type Credentials = EmailCredentials | TokenCredentials

export async function logUserInUseCase(credentials: Credentials) {
    const credentialResult = await _loginRouter(credentials)
    if (!credentialResult) throw new Error('Nenhum usuário foi logado')

    const idToken = await credentialResult.user.getIdToken()

    const userContext = {
        name: credentialResult.user.displayName || '',
        token: idToken,
        userId: credentialResult.user.uid,
    }

    await saveLocalUserContext(userContext)
    setUserContext(userContext)

    console.log(credentialResult)
}

async function _loginRouter(credentials: Credentials): Promise<UserCredential | null> {
    if (credentials.provider === 'email') return _emailLogin(credentials)
    if (credentials.provider === 'token') return _tokenLogin(credentials)

    return null
}

export function _tokenLogin(credentials: TokenCredentials) {
    return signInWithCustomToken(FIREBASE_AUTH, credentials.token)
}

async function _emailLogin(credentials: EmailCredentials) {
    const user = await signInWithEmailAndPassword(FIREBASE_AUTH, credentials.email, credentials.password)

    return user
}
