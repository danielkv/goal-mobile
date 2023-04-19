import { useTheme } from 'native-base'

import { ERouteName } from './types'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '@view/Home'
import Login from '@view/Login'
import WorksheetList from '@view/WorksheetList'

const Stack = createNativeStackNavigator()

function Router() {
    const { colors } = useTheme()

    return (
        <Stack.Navigator
            screenOptions={{
                contentStyle: { backgroundColor: colors.gray[700] },
                headerStyle: { backgroundColor: colors.gray[900] },
                headerTitleStyle: { color: colors.white },
            }}
            initialRouteName={ERouteName.Home}
        >
            <Stack.Screen name={ERouteName.Home} component={Home} />
            <Stack.Screen name={ERouteName.Login} component={Login} />
            <Stack.Screen name={ERouteName.WorksheetList} options={{ title: 'Planilhas' }} component={WorksheetList} />
        </Stack.Navigator>
    )
}

export default Router
