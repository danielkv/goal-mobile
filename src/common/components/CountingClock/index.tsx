import { useWindowDimensions } from 'react-native'
import { SvgProps } from 'react-native-svg'

import LandscapeMode from './LandscapeMode'
import PortraitMode from './PortraitMode'
import { TActivityStatus, TWatchProgressStatus } from '@common/interfaces/timers'

export interface CountingClockProps {
    time?: string
    Icon: React.FC<SvgProps>
    isPortrait?: boolean
    numberRounds?: number
    buttonTitle?: string
    hasRound?: boolean
    isTabata?: boolean
    weatherActivityStatus?: TActivityStatus
    watchProgressStatus?: TWatchProgressStatus
    onPressWatchStartButton?: () => void
    onPressClockEditButton?: () => void
    onPressTimePauseButton?: () => void
    onPressResetTimeButton?: () => void
}

const CountingClockComponent: React.FC<CountingClockProps> = (props) => {
    const { width, height } = useWindowDimensions()
    const isPortrait = height > width

    return <>{isPortrait ? PortraitMode(props) : LandscapeMode(props)}</>
}

export default CountingClockComponent
