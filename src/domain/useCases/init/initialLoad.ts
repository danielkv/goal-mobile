import { getLocalUserCredentials, setLoggedUser, setUserCredentials } from '@contexts/user/userContext'
import { Inter_300Light, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter'
import { logUserOutUseCase } from '@useCases/auth/logUserOut'
import { validateSessionCookieUseCase } from '@useCases/auth/sessionCookie'
import { logMessageUseCase } from '@useCases/log/logMessage'
import { createAppException } from '@utils/exceptions/AppException'

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
            setUserCredentials(validated.credentials)
            setLoggedUser(validated.user)
        } catch (err) {
            const logError = createAppException('ERROR_CAUGHT', err)
            logMessageUseCase(logError.toObject())
            logUserOutUseCase()
        }
    }
}
