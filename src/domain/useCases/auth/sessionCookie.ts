import { firebaseProvider } from '@common/providers/firebase'
import { UserContextCredentials } from '@contexts/user/userContext'
import { IUser } from '@models/user'

const validateSessionCookie = firebaseProvider.FUNCTION_CALL<string, IUser>('validateSessionCookie')

type TValidatedUser = {
    user: IUser
    credentials: UserContextCredentials
}

export const createSessionCookieUseCase = firebaseProvider.FUNCTION_CALL<string, { sessionCookie: string }>(
    'createSessionCookie'
)

export async function validateSessionCookieUseCase(session: string): Promise<TValidatedUser> {
    const { data: user } = await validateSessionCookie(session)

    return {
        user,
        credentials: {
            email: user.email,
            userId: user.uid,
            sessionCookie: session,
        },
    }
}
