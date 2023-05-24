import { firebaseProvider } from '@common/providers/firebase'
import { useUserContext } from '@contexts/user/userContext'
import { createAppException } from '@utils/exceptions/AppException'

const removeUser = firebaseProvider.FUNCTION_CALL<string, void>('removeUser')

export async function removeUserUseCase(): Promise<void> {
    const { user } = useUserContext.getState()
    if (!user) throw createAppException('NOT_LOGGED_IN', 'Nenhum usuário logado')

    await removeUser(user.uid)
}
