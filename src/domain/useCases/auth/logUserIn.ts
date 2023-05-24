import { firebaseProvider } from '@common/providers/firebase'
import { saveLocalUserCredentials, setUserCredentials } from '@contexts/user/userContext'
import { createAppException } from '@utils/exceptions/AppException'

import { UserCredential, signInWithEmailAndPassword } from 'firebase/auth'

import { createSessionCookieUseCase } from './sessionCookie'

type EmailCredentials = { provider: 'email'; email: string; password: string }

type Credentials = EmailCredentials

export async function logUserInUseCase(credentials: Credentials) {
    const credentialResult = await _loginRouter(credentials)
    if (!credentialResult) throw new Error('Nenhum usuário foi logado')

    if (!credentialResult.user.emailVerified)
        throw createAppException('EMAIL_NOT_VERIFIED', 'Verifique seu email antes de logar.', credentialResult.user)

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
    const auth = firebaseProvider.getAuth()
    if (!auth) throw new Error('Provedor de autenticação não conectado')

    const user = await signInWithEmailAndPassword(auth, credentials.email, credentials.password)

    return user
}
