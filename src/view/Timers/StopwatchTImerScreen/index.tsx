import { useState } from 'react'

import { Box, Button, Center } from 'native-base'

import StopwatchDisplay from './timer'
import RegressiveSvg from '@assets/svg/regressive.svg'
import TimerForm from '@components/TimerForm'

const StopwatchTimerScreen: React.FC = () => {
    const [state, setState] = useState<'form' | 'timer'>('form')

    const [time1, setTime1] = useState(600)

    return (
        <Center flex={1}>
            {state === 'form' ? (
                <>
                    <TimerForm type="stopwatch" Icon={RegressiveSvg} time1={time1} onChangeTime1={setTime1} />
                    <Box mt={5}>
                        <Button onPress={() => setState('timer')}>Aplicar</Button>
                    </Box>
                </>
            ) : (
                <StopwatchDisplay initialCountdown={3} finalTime={time1} onPressReset={() => setState('form')} />
            )}
        </Center>
    )
}

export default StopwatchTimerScreen
