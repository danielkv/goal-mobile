import { FIREBASE_AUTH } from '@common/providers/firebase'
import { UserContext, saveLocalUserContext, setUserContext } from '@contexts/user/userContext'
import { UserCredential, signInWithEmailAndPassword } from 'firebase/auth'

type EmailCredentials = { provider: 'email'; email: string; password: string }
type ContextCredentials = { provider: 'context'; context: UserContext }

type Credentials = EmailCredentials

export async function logUserInUseCase(credentials: Credentials) {
    const credentialResult = await _loginRouter(credentials)
    if (!credentialResult) throw new Error('Nenhum usuário foi logado')

    const userContext = {
        name: credentialResult.user.displayName || '',
        token: await credentialResult.user.getIdToken(),
        userId: credentialResult.user.uid,
    }

    await saveLocalUserContext(userContext)
    setUserContext(userContext)
}

export function contextLoginUseCase(context: UserContext) {
    return setUserContext(context)
}

async function _loginRouter(credentials: Credentials): Promise<UserCredential | null> {
    if (credentials.provider === 'email') return _emailLogin(credentials)

    return null
}

async function _emailLogin(credentials: EmailCredentials) {
    const user = await signInWithEmailAndPassword(FIREBASE_AUTH, credentials.email, credentials.password)

    return user
}
