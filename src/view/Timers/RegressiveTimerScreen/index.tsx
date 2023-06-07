import { useState } from 'react'

import { Button, Center, ScrollView } from 'native-base'

import RegressiveSvg from '@assets/svg/regressive.svg'
import SafeAreaView from '@components/SafeAreaView'
import TimerForm from '@components/TimerForm'
import { RouteProp, useRoute } from '@react-navigation/native'
import { TReactNavigationStackParamList } from '@router/types'

import RegressiveDisplay from './timer'

const RegressiveTimerScreen: React.FC = () => {
    const { params } = useRoute<RouteProp<TReactNavigationStackParamList, 'RegressiveTimerScreen'>>()

    const [state, setState] = useState<'form' | 'timer'>('form')

    const [time1, setTime1] = useState(() => params?.timecap || 600)
    const [countdown, setupCountdown] = useState(3)

    return (
        <SafeAreaView>
            {state === 'form' ? (
                <ScrollView flex={1} contentContainerStyle={{ paddingVertical: 35 }} keyboardShouldPersistTaps="always">
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
        </SafeAreaView>
    )
}

export default RegressiveTimerScreen
