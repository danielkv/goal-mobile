import { Inter_300Light, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter'

import { getLocalUserContext, setUserContext } from '@contexts/user/userContext'
import { logUserInUseCase } from '@useCases/auth/logUserIn'
import { logUserOutUseCase } from '@useCases/auth/logUserOut'
import * as Fonts from 'expo-font'

export async function initialLoadUseCase() {
    //logUserOutUseCase()

    await Fonts.loadAsync({
        Inter_300Light,
        Inter_400Regular,
        Inter_700Bold,
    })

    const localUser = await getLocalUserContext()
    if (localUser) {
        console.log(localUser)

        await logUserInUseCase({ provider: 'token', token: localUser.token })

        setUserContext(localUser)
    }
}
