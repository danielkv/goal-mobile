import { IconButton, useTheme } from 'native-base'

import { MaterialIcons } from '@expo/vector-icons'

import { ERouteName } from './types'
import { useUserContext } from '@contexts/user/userContext'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { logUserOutUseCase } from '@useCases/auth/logUserOut'
import DayViewScreen from '@view/DayViewScreen'
import HomeScreen from '@view/HomeScreen'
import LoginScreen from '@view/LoginScreen'
import SubscriptionScreen from '@view/SubscriptionScreen'
import EmomTimerScreen from '@view/Timers/EmomTimerScreen'
import RegressiveTimerScreen from '@view/Timers/RegressiveTimerScreen'
import StopwatchTimerScreen from '@view/Timers/StopwatchTImerScreen'
import TabataTimerScreen from '@view/Timers/TabataTimerScreen'
import TimersScreen from '@view/Timers/TimersScreen'
import WorksheetDays from '@view/WorksheetDays'
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
                headerRight: () => {
                    const user = useUserContext()

                    if (!user.credentials) return null
                    return (
                        <IconButton onPress={logUserOutUseCase}>
                            <MaterialIcons name="logout" size={22} color={colors.gray[100]} />
                        </IconButton>
                    )
                },
            }}
            initialRouteName={ERouteName.HomeScreen}
        >
            <Stack.Screen name={ERouteName.HomeScreen} component={HomeScreen} options={{ title: 'My Goal' }} />
            <Stack.Screen name={ERouteName.LoginScreen} component={LoginScreen} options={{ title: 'Login' }} />
            <Stack.Screen
                name={ERouteName.SubscriptionScreen}
                component={SubscriptionScreen}
                options={{ title: 'Cadastro' }}
            />
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
            <Stack.Screen
                name={ERouteName.StopwatchTimerScreen}
                component={StopwatchTimerScreen}
                options={{
                    title: 'Cronômetro',
                }}
            />
            <Stack.Screen
                name={ERouteName.EmomTimerScreen}
                component={EmomTimerScreen}
                options={{
                    title: 'EMOM',
                }}
            />
            <Stack.Screen
                name={ERouteName.TabataTimerScreen}
                component={TabataTimerScreen}
                options={{
                    title: 'Tabata',
                }}
            />
            <Stack.Screen
                name={ERouteName.WorksheetList}
                options={{ title: 'Planilhas' }}
                component={WorksheetListScreen}
            />
            <Stack.Screen name={ERouteName.WorksheetDays} options={{ title: 'Dias' }} component={WorksheetDays} />
            <Stack.Screen name={ERouteName.DayView} options={{ title: 'Dia' }} component={DayViewScreen} />
        </Stack.Navigator>
    )
}

export default Router
