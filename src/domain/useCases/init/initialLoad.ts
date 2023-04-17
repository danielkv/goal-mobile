import * as Fonts from 'expo-font'

import { Inter_300Light, Inter_400Regular, Inter_700Bold } from '@expo-google-fonts/inter'

import { getLocalUserContext, setUserContext } from '../../contexts/user/userContext'

export async function initialLoadUseCase() {
    await Fonts.loadAsync({
        Inter_300Light,
        Inter_400Regular,
        Inter_700Bold,
    })

    const localUser = await getLocalUserContext()
    if (localUser) {
        setUserContext(localUser)
    }
}
