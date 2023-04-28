import { useState } from 'react'

import { Box, Button, Center, ScrollView } from 'native-base'

import EmomDisplay from './timer'
import EmomSvg from '@assets/svg/emom.svg'
import TimerForm from '@components/TimerForm'

const EmomTimerScreen: React.FC = () => {
    const [state, setState] = useState<'form' | 'timer'>('form')

    const [each, setEach] = useState(60)
    const [rounds, setRounds] = useState(5)
    const [countdown, setupCountdown] = useState(3)

    return (
        <Box flex={1} safeAreaBottom>
            {state === 'form' ? (
                <ScrollView flex={1} contentContainerStyle={{ paddingVertical: 35 }}>
                    <TimerForm
                        type="emom"
                        rounds={rounds}
                        onChangeRounds={setRounds}
                        countdown={countdown}
                        onChangeCountdown={setupCountdown}
                        Icon={EmomSvg}
                        time1={each}
                        onChangeTime1={setEach}
                    />
                    <Center mt={5}>
                        <Button onPress={() => setState('timer')}>Aplicar</Button>
                    </Center>
                </ScrollView>
            ) : (
                <EmomDisplay
                    rounds={rounds}
                    initialCountdown={countdown}
                    each={each}
                    onPressReset={() => setState('form')}
                />
            )}
        </Box>
    )
}

export default EmomTimerScreen
