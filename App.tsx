import { useEffect, useState } from 'react'
import { Alert } from 'react-native'

import { NativeBaseProvider } from 'native-base'

import { theme } from './src/theme'
import { NavigationContainer } from '@react-navigation/native'
import { initialLoadUseCase } from '@useCases/init/initialLoad'
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

    useEffect(() => {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)

        initialLoadUseCase()
            .then(() => {
                setLoaded(true)
            })
            .then(() => SplashScreen.hideAsync())
            .catch((err) => {
                Alert.alert('Error', err.message)
            })
    }, [])

    if (!loaded) return null

    return (
        <NavigationContainer>
            <NativeBaseProvider theme={theme}>
                <StatusBar style="auto" />
                <AppLayout />
            </NativeBaseProvider>
        </NavigationContainer>
    )
}
