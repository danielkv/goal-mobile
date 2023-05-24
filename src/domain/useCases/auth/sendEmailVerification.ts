import { User, sendEmailVerification } from 'firebase/auth'

export function sendEmailVerificationUseCase(user: User) {
    return sendEmailVerification(user)
}
