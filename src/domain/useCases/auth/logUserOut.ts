import { FIREBASE_AUTH } from '@common/providers/firebase'
import { removeLocalUserCredentials, setUserCredentials } from '@contexts/user/userContext'

export async function logUserOutUseCase() {
    await FIREBASE_AUTH.signOut()
    setUserCredentials(null)
    removeLocalUserCredentials()
}
