import { firebaseProvider } from '@common/providers/firebase'
import { IUser, IUserInput } from '@models/user'

export const createNewUser = firebaseProvider.FUNCTION_CALL<IUserInput, IUser>('createNewUser')

export async function createUserUseCase(user: IUserInput): Promise<IUser> {
    const newUser = await createNewUser(user)

    return newUser.data
}
