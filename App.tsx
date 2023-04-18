import { useEffect, useState } from 'react'
import { Alert } from 'react-native'

import { NativeBaseProvider } from 'native-base'

import Router from './src/router'
import { theme } from './src/theme'
import { NavigationContainer } from '@react-navigation/native'
import { initialLoadUseCase } from '@useCases/init/initialLoad'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'

SplashScreen.preventAutoHideAsync()

export default function App() {
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
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
                <Router />
            </NativeBaseProvider>
        </NavigationContainer>
    )
}
