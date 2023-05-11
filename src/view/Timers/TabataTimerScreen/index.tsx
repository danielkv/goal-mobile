import { useState } from 'react'

import { Box, Button, Center, ScrollView } from 'native-base'

import TabataDisplay from './timer'
import TabataSvg from '@assets/svg/tabata.svg'
import TimerForm from '@components/TimerForm'
import { RouteProp, useRoute } from '@react-navigation/native'
import { TReactNavigationStackParamList } from '@router/types'

const TabataTimerScreen: React.FC = () => {
    const { params } = useRoute<RouteProp<TReactNavigationStackParamList, 'TabataTimerScreen'>>()

    const [state, setState] = useState<'form' | 'timer'>('form')

    const [work, setWork] = useState(() => params?.work || 20)
    const [rest, setRest] = useState(() => params?.rest || 10)
    const [rounds, setRounds] = useState(() => params?.numberOfRounds || 8)
    const [countdown, setupCountdown] = useState(3)

    return (
        <Box flex={1} safeAreaBottom>
            {state === 'form' ? (
                <ScrollView flex={1} contentContainerStyle={{ paddingVertical: 35 }}>
                    <TimerForm
                        type="tabata"
                        rounds={rounds}
                        onChangeRounds={setRounds}
                        countdown={countdown}
                        onChangeCountdown={setupCountdown}
                        Icon={TabataSvg}
                        time1={work}
                        onChangeTime1={setWork}
                        time2={rest}
                        onChangeTime2={setRest}
                    />
                    <Center mt={5}>
                        <Button onPress={() => setState('timer')}>Aplicar</Button>
                    </Center>
                </ScrollView>
            ) : (
                <TabataDisplay
                    initialCountdown={countdown}
                    work={work}
                    rest={rest}
                    rounds={rounds}
                    onPressReset={() => setState('form')}
                />
            )}
        </Box>
    )
}

export default TabataTimerScreen
