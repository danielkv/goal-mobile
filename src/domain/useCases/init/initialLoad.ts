import { Inter_300Light, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter'

import { getLocalUserContext } from '@contexts/user/userContext'
import { contextLoginUseCase } from '@useCases/auth/logUserIn'
import * as Fonts from 'expo-font'

export async function initialLoadUseCase() {
    await Fonts.loadAsync({
        Inter_300Light,
        Inter_400Regular,
        Inter_700Bold,
    })

    const localUser = await getLocalUserContext()
    if (localUser) {
        contextLoginUseCase(localUser)
    }
}
