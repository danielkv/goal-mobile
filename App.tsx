import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'

import { NavigationContainer } from '@react-navigation/native'

import Router from './src/router'
import { theme } from './src/theme'

export default function App() {
    return (
        <NavigationContainer>
            <NativeBaseProvider theme={theme}>
                <StatusBar style="auto" />
                <Router />
            </NativeBaseProvider>
        </NavigationContainer>
    )
}
