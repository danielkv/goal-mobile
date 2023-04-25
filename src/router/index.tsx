import { useTheme } from 'native-base'

import { ERouteName } from './types'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '@view/HomeScreen'
import LoginScreen from '@view/LoginScreen'
import RegressiveTimerScreen from '@view/Timers/RegressiveTimerScreen'
import TimersScreen from '@view/Timers/TimersScreen'
import WorksheetListScreen from '@view/WorksheetListScreen'

const Stack = createNativeStackNavigator()

function Router() {
    const { colors } = useTheme()

    return (
        <Stack.Navigator
            screenOptions={{
                contentStyle: { backgroundColor: colors.gray[700] },
                headerStyle: { backgroundColor: colors.gray[900] },
                headerTitleStyle: { color: colors.white },
                headerBackTitleVisible: false,
                headerTintColor: colors.gray[300],
                headerTitleAlign: 'left',
            }}
            initialRouteName={ERouteName.HomeScreen}
        >
            <Stack.Screen name={ERouteName.HomeScreen} component={HomeScreen} />
            <Stack.Screen name={ERouteName.LoginScreen} component={LoginScreen} />
            <Stack.Screen
                name={ERouteName.WorksheetListScreen}
                options={{ title: 'Planilhas' }}
                component={WorksheetListScreen}
            />
            <Stack.Screen
                name={ERouteName.TimersScreen}
                component={TimersScreen}
                options={{
                    title: 'Timers',
                }}
            />
            <Stack.Screen
                name={ERouteName.RegressiveTimerScreen}
                component={RegressiveTimerScreen}
                options={{
                    title: 'Timer regressivo',
                }}
            />
        </Stack.Navigator>
    )
}

export default Router
