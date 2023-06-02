import { useState } from 'react'

import { Button, Center, ScrollView } from 'native-base'

import StopwatchSvg from '@assets/svg/stopwatch.svg'
import SafeAreaView from '@components/SafeAreaView'
import TimerForm from '@components/TimerForm'
import { RouteProp, useRoute } from '@react-navigation/native'
import { TReactNavigationStackParamList } from '@router/types'

import StopwatchDisplay from './timer'

const StopwatchTimerScreen: React.FC = () => {
    const { params } = useRoute<RouteProp<TReactNavigationStackParamList, 'StopwatchTimerScreen'>>()

    const [state, setState] = useState<'form' | 'timer'>('form')

    const [timecap, setTimecap] = useState(() => params?.timecap || 0)
    const [countdown, setupCountdown] = useState(3)

    return (
        <SafeAreaView>
            {state === 'form' ? (
                <ScrollView flex={1} contentContainerStyle={{ paddingVertical: 35 }} keyboardShouldPersistTaps="always">
                    <TimerForm
                        countdown={countdown}
                        onChangeCountdown={setupCountdown}
                        type="stopwatch"
                        Icon={StopwatchSvg}
                        time1={timecap}
                        onChangeTime1={setTimecap}
                    />
                    <Center mt={5}>
                        <Button onPress={() => setState('timer')}>Aplicar</Button>
                    </Center>
                </ScrollView>
            ) : (
                <StopwatchDisplay
                    initialCountdown={countdown}
                    finalTime={timecap}
                    onPressReset={() => setState('form')}
                />
            )}
        </SafeAreaView>
    )
}

export default StopwatchTimerScreen
