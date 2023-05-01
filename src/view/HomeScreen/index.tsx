import { Button, Text, VStack } from 'native-base'

import { useUserContext } from '@contexts/user/userContext'
import { useNavigation } from '@react-navigation/native'
import { ERouteName } from '@router/types'
import { logUserOutUseCase } from '@useCases/auth/logUserOut'

const HomeScreen: React.FC = () => {
    const { navigate } = useNavigation()
    const user = useUserContext()

    return (
        <VStack px={4} pt={8} space={6}>
            {user.credentials && (
                <Button
                    onPress={() => {
                        logUserOutUseCase()
                    }}
                >
                    <Text>Logout</Text>
                </Button>
            )}
            <Button onPress={() => navigate(ERouteName.LoginScreen)}>Login Page</Button>
            <Button onPress={() => navigate(ERouteName.WorksheetListScreen)}>WorksheetList Page</Button>
            <Button onPress={() => navigate(ERouteName.TimersScreen)}>Timers Page</Button>
        </VStack>
    )
}

export default HomeScreen
