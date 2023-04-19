import { Center, HStack, Heading } from 'native-base'

import { CardComponent } from './components/Card'
import EmomSvg from '@assets/svg/emom.svg'
import RegressiveSvg from '@assets/svg/regressive.svg'
import StopwatchSvg from '@assets/svg/stopwatch.svg'
import TabataIcon from '@assets/svg/tabata.svg'

export const TimersScreen: React.FC = () => {
    return (
        <Center>
            <Heading mt={'7'} mb={'7'} fontFamily={'heading'} fontSize={'2xl'} color={'white'} lineHeight={'2xl'}>
                Selecione o Timer
            </Heading>
            <HStack space={4} mb={4}>
                <CardComponent description="Stopwatch" Icon={StopwatchSvg} />
                <CardComponent description="Regressivo" Icon={RegressiveSvg} />
            </HStack>
            <HStack space={4}>
                <CardComponent description="Tabata" Icon={TabataIcon} />
                <CardComponent description="EMOM" Icon={EmomSvg} />
            </HStack>
        </Center>
    )
}
