import { firebaseProvider } from '@common/providers/firebase'

import Constants from 'expo-constants'
import { sendPasswordResetEmail } from 'firebase/auth'

export function sendResetPasswordEmailUseCase(email: string) {
    const auth = firebaseProvider.getAuth()
    if (!auth) throw new Error('Provedor de autenticação não conectado')

    return sendPasswordResetEmail(auth, email, {
        url: Constants.expoConfig?.extra?.WEB_APP_RESET_PASSWORD_URL,
    })
}
