import { Box, HStack, Heading } from 'native-base'

import { TimerCard } from './components/Card'
import EmomSvg from '@assets/svg/emom.svg'
import RegressiveSvg from '@assets/svg/regressive.svg'
import StopwatchSvg from '@assets/svg/stopwatch.svg'
import TabataIcon from '@assets/svg/tabata.svg'

export const TimersScreen: React.FC = () => {
    return (
        <Box p={7}>
            <Heading mb={'7'} textAlign="center" fontFamily="heading" fontSize="2xl" color="white" lineHeight="2xl">
                Selecione o Timer
            </Heading>
            <HStack space={4} mb={4}>
                <TimerCard title="Stopwatch" Icon={StopwatchSvg} />
                <TimerCard title="Regressivo" Icon={RegressiveSvg} />
            </HStack>
            <HStack space={4}>
                <TimerCard title="Tabata" Icon={TabataIcon} />
                <TimerCard title="EMOM" Icon={EmomSvg} />
            </HStack>
        </Box>
    )
}
