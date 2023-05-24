import { firebaseProvider } from '@common/providers/firebase'
import { removeLocalUserCredentials, setLoggedUser, setUserCredentials } from '@contexts/user/userContext'

export async function logUserOutUseCase() {
    await firebaseProvider.getAuth().signOut()

    setUserCredentials(null)
    setLoggedUser(null)
    removeLocalUserCredentials()
}
