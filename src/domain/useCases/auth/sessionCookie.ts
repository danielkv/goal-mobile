import { FUNCTION_CALL } from '@common/providers/firebase'
import { UserContextCredentials } from '@contexts/user/userContext'

const validateSessionCookie = FUNCTION_CALL<
    string,
    Omit<UserContextCredentials, 'sessionCookie' | 'userId'> & { uid: string }
>('validateSessionCookie')

export const createSessionCookieUseCase = FUNCTION_CALL<string, { sessionCookie: string }>('createSessionCookie')

export async function validateSessionCookieUseCase(session: string): Promise<UserContextCredentials> {
    const response = await validateSessionCookie(session)

    return {
        email: response.data.email,
        userId: response.data.uid,
        sessionCookie: session,
    }
}