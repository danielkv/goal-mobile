import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import { StyleSheet, Text, View } from 'react-native'

export default function App() {
    return (
        <NativeBaseProvider>
            <StatusBar style="auto" />
            <View>
                <Text>Open up App.tsx to start working on your app!</Text>
            </View>
        </NativeBaseProvider>
    )
}
