import { useOrientation } from '@common/hooks/useOrientation'
import MenuButton from '@components/MenuButton'
import { useNavigation } from '@react-navigation/native'
import { ERouteName } from '@router/types'
import { FileSpreadsheet, Home, Timer } from '@tamagui/lucide-icons'

import { XStack } from 'tamagui'

const AppBottomBar: React.FC = () => {
    const { navigate } = useNavigation()
    const orientation = useOrientation()

    if (orientation === 'landscape') return null

    return (
        <XStack gap={5} jc="center" bg="$gray9" btc="$red5" btw="$1" h={70}>
            <MenuButton
                label="Home"
                Icon={() => <Home size={22} color="$gray4" />}
                onPress={() => navigate(ERouteName.HomeScreen)}
            />
            <MenuButton
                label="Planilhas"
                Icon={() => <FileSpreadsheet size={22} color="$gray4" />}
                onPress={() => navigate(ERouteName.WorksheetList)}
            />
            <MenuButton
                label="Timers"
                Icon={() => <Timer size={22} color="$gray4" />}
                onPress={() => navigate(ERouteName.TimersScreen)}
            />
        </XStack>
    )
}

export default AppBottomBar
