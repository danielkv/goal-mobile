import { useOrientation } from '@common/hooks/useOrientation'
import MenuButton from '@components/MenuButton'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { ERouteName } from '@router/types'

import { XStack, useTheme } from 'tamagui'

const AppBottomBar: React.FC = () => {
    const theme = useTheme()
    const { navigate } = useNavigation()
    const orientation = useOrientation()

    if (orientation === 'landscape') return null

    return (
        <XStack gap={5} jc="center" bg="$gray9" btc="$red5" btw="$1" h={70}>
            <MenuButton
                label="Home"
                Icon={() => <MaterialIcons name="home" size={22} color={theme.gray4.val} />}
                onPress={() => navigate(ERouteName.HomeScreen)}
            />
            <MenuButton
                label="Planilhas"
                Icon={() => <MaterialIcons name="featured-play-list" size={22} color={theme.gray4.val} />}
                onPress={() => navigate(ERouteName.WorksheetList)}
            />
            <MenuButton
                label="Timers"
                Icon={() => <MaterialIcons name="timer" size={22} color={theme.gray4.val} />}
                onPress={() => navigate(ERouteName.TimersScreen)}
            />
        </XStack>
    )
}

export default AppBottomBar
