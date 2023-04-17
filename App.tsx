import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import { useEffect, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native'

import { initialLoadUseCase } from './src/domain/useCases/init/initialLoad'
import Router from './src/router'
import { theme } from './src/theme'

SplashScreen.preventAutoHideAsync()

export default function App() {
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        initialLoadUseCase()
            .then(() => {
                setLoaded(true)
            })
            .then(() => SplashScreen.hideAsync())
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
