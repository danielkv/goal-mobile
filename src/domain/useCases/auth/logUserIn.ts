import { createSessionCookieUseCase } from './sessionCookie'
import { FIREBASE_AUTH } from '@common/providers/firebase'
import { saveLocalUserCredentials, setUserCredentials } from '@contexts/user/userContext'
import { UserCredential, signInWithEmailAndPassword } from 'firebase/auth'

type EmailCredentials = { provider: 'email'; email: string; password: string }

type Credentials = EmailCredentials

export async function logUserInUseCase(credentials: Credentials) {
    const credentialResult = await _loginRouter(credentials)
    if (!credentialResult) throw new Error('Nenhum usuário foi logado')

    const idToken = await credentialResult.user.getIdToken()

    const cookie = await createSessionCookieUseCase(idToken)

    const userContext = {
        sessionCookie: cookie.data.sessionCookie,
        email: credentialResult.user.email || '',
        userId: credentialResult.user.uid,
    }

    await saveLocalUserCredentials(userContext)
    setUserCredentials(userContext)
}

async function _loginRouter(credentials: Credentials): Promise<UserCredential | null> {
    if (credentials.provider === 'email') return _emailLogin(credentials)

    return null
}

async function _emailLogin(credentials: EmailCredentials) {
    const user = await signInWithEmailAndPassword(FIREBASE_AUTH, credentials.email, credentials.password)

    return user
}
