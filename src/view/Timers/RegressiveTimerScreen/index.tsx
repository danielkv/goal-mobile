import { useState } from 'react'

import { Box, Button, Center, ScrollView } from 'native-base'

import RegressiveDisplay from './timer'
import RegressiveSvg from '@assets/svg/regressive.svg'
import TimerForm from '@components/TimerForm'

const RegressiveTimerScreen: React.FC = () => {
    const [state, setState] = useState<'form' | 'timer'>('form')

    const [time1, setTime1] = useState(600)
    const [countdown, setupCountdown] = useState(3)

    return (
        <Box flex={1} safeAreaBottom>
            {state === 'form' ? (
                <ScrollView flex={1} contentContainerStyle={{ paddingVertical: 35 }}>
                    <TimerForm
                        countdown={countdown}
                        onChangeCountdown={setupCountdown}
                        type="regressive"
                        Icon={RegressiveSvg}
                        time1={time1}
                        onChangeTime1={setTime1}
                    />
                    <Center mt={5}>
                        <Button onPress={() => setState('timer')}>Aplicar</Button>
                    </Center>
                </ScrollView>
            ) : (
                <RegressiveDisplay
                    initialCountdown={countdown}
                    initialTime={time1}
                    onPressReset={() => setState('form')}
                />
            )}
        </Box>
    )
}

export default RegressiveTimerScreen
