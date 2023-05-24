import { IUser } from '@models/user'

import { sendEmailVerification } from 'firebase/auth'

export function sendEmailVerificationUseCase(user: IUser) {
    return sendEmailVerification(user)
}
