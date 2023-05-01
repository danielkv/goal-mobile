import { Button, Center } from 'native-base'

import { useNavigation } from '@react-navigation/native'
import { ERouteName } from '@router/types'

const HomeScreen: React.FC = () => {
    const { navigate } = useNavigation()

    return (
        <Center px={4} pt={8}>
            <Button onPress={() => navigate(ERouteName.LoginScreen)} mb={4} minW={40} minH={10}>
                Login Page
            </Button>
            <Button onPress={() => navigate(ERouteName.WorksheetListScreen)} mb={4} minW={40} minH={10}>
                WorksheetList Page
            </Button>
            <Button onPress={() => navigate(ERouteName.TimersScreen)} mb={4} minW={40} minH={10}>
                Timers Page
            </Button>
        </Center>
    )
}

export default HomeScreen
