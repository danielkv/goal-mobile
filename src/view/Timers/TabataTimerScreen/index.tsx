import { useState } from 'react'

import { Box, Button, Center, ScrollView } from 'native-base'

import TabataDisplay from './timer'
import TabataSvg from '@assets/svg/tabata.svg'
import TimerForm from '@components/TimerForm'

const TabataTimerScreen: React.FC = () => {
    const [state, setState] = useState<'form' | 'timer'>('form')

    const [work, setWork] = useState(5)
    const [rest, setRest] = useState(2)
    const [rounds, setRounds] = useState(8)
    const [countdown, setupCountdown] = useState(0)

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
