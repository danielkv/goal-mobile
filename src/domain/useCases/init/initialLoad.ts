import { Inter_300Light, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter'

import { getLocalUserCredentials, setUserCredentials } from '@contexts/user/userContext'
import { logUserOutUseCase } from '@useCases/auth/logUserOut'
import { validateSessionCookieUseCase } from '@useCases/auth/sessionCookie'
import * as Fonts from 'expo-font'

export async function initialLoadUseCase() {
    await Fonts.loadAsync({
        Inter_300Light,
        Inter_400Regular,
        Inter_700Bold,
    })

    const localUser = await getLocalUserCredentials()
    if (localUser) {
        try {
            const validated = await validateSessionCookieUseCase(localUser.sessionCookie)
            setUserCredentials(validated)
        } catch (err) {
            logUserOutUseCase()
        }
    }
}
