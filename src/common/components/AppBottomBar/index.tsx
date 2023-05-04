import { HStack, useTheme } from 'native-base'

import { MaterialIcons } from '@expo/vector-icons'

import MenuButton from '@components/MenuButton'
import { useNavigation } from '@react-navigation/native'
import { ERouteName } from '@router/types'

const AppBottomBar: React.FC = () => {
    const { colors } = useTheme()
    const { navigate } = useNavigation()

    return (
        <HStack
            space={5}
            justifyContent="center"
            bg="gray.900"
            borderTopColor="red.500"
            borderTopWidth={2}
            style={{ height: 70 }}
        >
            <MenuButton
                label="Home"
                Icon={() => <MaterialIcons name="home" size={22} color={colors.gray[500]} />}
                onPress={() => navigate(ERouteName.HomeScreen)}
            />
            <MenuButton
                label="Planilhas"
                Icon={() => <MaterialIcons name="featured-play-list" size={22} color={colors.gray[500]} />}
                onPress={() => navigate(ERouteName.WorksheetList)}
            />
            <MenuButton
                label="Timers"
                Icon={() => <MaterialIcons name="timer" size={22} color={colors.gray[500]} />}
                onPress={() => navigate(ERouteName.TimersScreen)}
            />
        </HStack>
    )
}

export default AppBottomBar
