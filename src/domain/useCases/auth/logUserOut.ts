import { firebaseProvider } from '@common/providers/firebase'
import { removeLocalUserCredentials, setUserCredentials } from '@contexts/user/userContext'

export async function logUserOutUseCase() {
    await firebaseProvider.getAuth().signOut()

    setUserCredentials(null)
    removeLocalUserCredentials()
}
