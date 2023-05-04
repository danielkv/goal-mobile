import { useEffect, useState } from 'react'
import { Alert } from 'react-native'

import { NativeBaseProvider } from 'native-base'

import { theme } from './src/theme'
import { NavigationContainer } from '@react-navigation/native'
import { initialLoadUseCase } from '@useCases/init/initialLoad'
import { getErrorMessage } from '@utils/getErrorMessage'
import AppLayout from '@view/AppLayout'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import duration from 'dayjs/plugin/duration'
import * as ScreenOrientation from 'expo-screen-orientation'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'

dayjs.locale('pt-br')
dayjs.extend(duration)

SplashScreen.preventAutoHideAsync()

export default function App() {
    const [loaded, setLoaded] = useState(false)

    async function initialLoad() {
        try {
            await initialLoadUseCase()
            setLoaded(true)
            return await SplashScreen.hideAsync()
        } catch (err) {
            Alert.alert('Error', getErrorMessage(err), [{ style: 'default', onPress: () => initialLoad() }])
        }
    }

    useEffect(() => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT).catch(() => {})

        initialLoad()
    }, [])

    if (!loaded) return null

    return (
        <NavigationContainer>
            <NativeBaseProvider theme={theme}>
                <StatusBar style="light" />
                <AppLayout />
            </NativeBaseProvider>
        </NavigationContainer>
    )
}
