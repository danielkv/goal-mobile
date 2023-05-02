import { FIREBASE_AUTH } from '@common/providers/firebase'
import Constants from 'expo-constants'
import { sendPasswordResetEmail } from 'firebase/auth'

export function sendResetPasswordEmailUseCase(email: string) {
    return sendPasswordResetEmail(FIREBASE_AUTH, email, {
        url: Constants.expoConfig?.extra?.WEB_APP_RESET_PASSWORD_URL,
    })
}
