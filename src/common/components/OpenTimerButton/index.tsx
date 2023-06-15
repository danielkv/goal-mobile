import { TouchableOpacity } from 'react-native'

import { IEventBlock, IRound } from '@models/block'
import { useNavigation } from '@react-navigation/native'
import { ERouteName } from '@router/types'
import {
    blockTimerSettings,
    blockTimerType,
    checkIsTimedWorkout,
    roundTimerSettings,
    roundTimerType,
} from '@utils/timer-display'

export interface OpenTimerButtonProps {
    disabled?: boolean
    block?: IEventBlock
    round?: IRound
    children: React.ReactNode
}

const OpenTimerButton: React.FC<OpenTimerButtonProps> = ({ block, round, children, disabled }) => {
    const { navigate } = useNavigation()

    const isTimedWorkout = block ? checkIsTimedWorkout(block) : false
    const type = block ? blockTimerType(block) : round ? roundTimerType(round) : null
    const settings = block ? blockTimerSettings(block) : round ? roundTimerSettings(round) : null

    if (!isTimedWorkout && (!type || !settings)) {
        return <>{children}</>
    }

    const handleOnPress = () => {
        if (isTimedWorkout && block) return navigate(ERouteName.WodTimer, { block })

        if (!type || !settings) return

        switch (type) {
            case 'for_time':
            case 'amrap':
                return navigate('StopwatchTimerScreen', {
                    numberOfRounds: settings.numberOfRounds,
                    timecap: settings.timecap,
                })
            case 'emom':
                return navigate('EmomTimerScreen', { numberOfRounds: settings.numberOfRounds, each: settings.each })
            case 'tabata':
                return navigate('TabataTimerScreen', {
                    numberOfRounds: settings.numberOfRounds,
                    work: settings.work,
                    rest: settings.rest,
                })
        }
    }

    return (
        <TouchableOpacity disabled={disabled} onPress={handleOnPress}>
            {children}
        </TouchableOpacity>
    )
}

export default OpenTimerButton
