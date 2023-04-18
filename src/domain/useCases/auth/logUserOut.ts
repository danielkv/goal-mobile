import { FIREBASE_AUTH } from '@common/providers/firebase'
import { removeLocalUserContext, setUserContext } from '@contexts/user/userContext'

export async function logUserOutUseCase() {
    await FIREBASE_AUTH.signOut()
    setUserContext(null)
    removeLocalUserContext()
}
