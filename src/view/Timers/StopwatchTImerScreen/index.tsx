import { useState } from 'react'

import { Box, Button, Center, ScrollView } from 'native-base'

import StopwatchDisplay from './timer'
import StopwatchSvg from '@assets/svg/stopwatch.svg'
import TimerForm from '@components/TimerForm'

const StopwatchTimerScreen: React.FC = () => {
    const [state, setState] = useState<'form' | 'timer'>('form')

    const [time1, setTime1] = useState(0)
    const [countdown, setupCountdown] = useState(3)

    return (
        <Box flex={1} safeAreaBottom>
            {state === 'form' ? (
                <ScrollView flex={1} contentContainerStyle={{ paddingVertical: 35 }}>
                    <TimerForm
                        countdown={countdown}
                        onChangeCountdown={setupCountdown}
                        type="stopwatch"
                        Icon={StopwatchSvg}
                        time1={time1}
                        onChangeTime1={setTime1}
                    />
                    <Center mt={5}>
                        <Button onPress={() => setState('timer')}>Aplicar</Button>
                    </Center>
                </ScrollView>
            ) : (
                <StopwatchDisplay
                    initialCountdown={countdown}
                    finalTime={time1}
                    onPressReset={() => setState('form')}
                />
            )}
        </Box>
    )
}

export default StopwatchTimerScreen
