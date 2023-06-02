import { firebaseProvider } from '@common/providers/firebase'
import { setLoggedUser } from '@contexts/user/userContext'

export async function logUserOutUseCase() {
    await firebaseProvider.auth.signOut()

    setLoggedUser(null)
}
