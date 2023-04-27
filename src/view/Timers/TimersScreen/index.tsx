import { Box, HStack, Heading } from 'native-base'

import TimerCard from './components/Card'
import EmomSvg from '@assets/svg/emom.svg'
import RegressiveSvg from '@assets/svg/regressive.svg'
import StopwatchSvg from '@assets/svg/stopwatch.svg'
import TabataIcon from '@assets/svg/tabata.svg'
import { useNavigation } from '@react-navigation/native'
import { ERouteName } from '@router/types'

const TimersScreen: React.FC = () => {
    const { navigate } = useNavigation()
    return (
        <Box p={7}>
            <Heading mb={'7'} textAlign="center" fontFamily="heading" fontSize="2xl" color="white" lineHeight="2xl">
                Selecione o Timer
            </Heading>
            <HStack space={4} mb={4}>
                <TimerCard
                    title="Stopwatch"
                    Icon={StopwatchSvg}
                    onPress={() => navigate(ERouteName.StopwatchTimerScreen)}
                />
                <TimerCard
                    title="Regressivo"
                    Icon={RegressiveSvg}
                    onPress={() => navigate(ERouteName.RegressiveTimerScreen)}
                />
            </HStack>
            <HStack space={4}>
                <TimerCard title="Tabata" Icon={TabataIcon} />
                <TimerCard title="EMOM" Icon={EmomSvg} />
            </HStack>
        </Box>
    )
}

export default TimersScreen
