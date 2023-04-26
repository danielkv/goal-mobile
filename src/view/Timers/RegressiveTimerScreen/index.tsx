import { useState } from 'react'

import { Box, Button, Center } from 'native-base'

import RegressiveTimerTimer from './timer'
import RegressiveSvg from '@assets/svg/regressive.svg'
import TimerForm from '@components/TimerForm'

const RegressiveTimerScreen: React.FC = () => {
    const [state, setState] = useState<'form' | 'timer'>('form')

    const [time1, setTime1] = useState(600)

    return (
        <Center flex={1}>
            {state === 'form' ? (
                <>
                    <TimerForm type="regressive" Icon={RegressiveSvg} time1={time1} onChangeTime1={setTime1} />
                    <Box mt={5}>
                        <Button onPress={() => setState('timer')}>Aplicar</Button>
                    </Box>
                </>
            ) : (
                <RegressiveTimerTimer initialTime1={time1} onPressReset={() => setState('form')} />
            )}
        </Center>
    )
}

export default RegressiveTimerScreen
