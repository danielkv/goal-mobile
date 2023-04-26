import { useWindowDimensions } from 'react-native'
import { SvgProps } from 'react-native-svg'

import LandscapeMode from './LandscapeMode'
import PortraitMode from './PortraitMode'
import { TWatchProgressStatus, TWeatherActivityStatus } from '@common/interfaces/timers'

export interface CountingClockProps {
    time?: string
    Icon: React.FC<SvgProps>
    isPortrait?: boolean
    numberRounds?: number
    buttonTitle?: string
    hasRound?: boolean
    isTabata?: boolean
    weatherActivityStatus?: TWeatherActivityStatus
    watchProgressStatus?: TWatchProgressStatus
    onPressWatchStartButton?: () => void
    onPressClockEditButton?: () => void
    onPressTimePauseButton?: () => void
    onPressResetTimeButton?: () => void
}

const CountingClockComponent: React.FC<CountingClockProps> = ({
    time,
    Icon,
    numberRounds,
    buttonTitle,
    onPressWatchStartButton,
    onPressClockEditButton,
    onPressTimePauseButton,
    onPressResetTimeButton,
    hasRound,
    isTabata,
    weatherActivityStatus,
    watchProgressStatus,
    ...rest
}) => {
    const { width, height } = useWindowDimensions()
    const isPortrait = height > width

    return (
        <>
            {isPortrait
                ? PortraitMode({
                      time,
                      Icon,
                      numberRounds,
                      buttonTitle,
                      onPressWatchStartButton,
                      onPressClockEditButton,
                      onPressTimePauseButton,
                      onPressResetTimeButton,
                      hasRound,
                      isTabata,
                      weatherActivityStatus,
                      watchProgressStatus,
                      ...rest,
                  })
                : LandscapeMode({
                      time,
                      Icon,
                      numberRounds,
                      buttonTitle,
                      onPressWatchStartButton,
                      onPressClockEditButton,
                      onPressTimePauseButton,
                      onPressResetTimeButton,
                      hasRound,
                      isTabata,
                      weatherActivityStatus,
                      watchProgressStatus,
                      ...rest,
                  })}
        </>
    )
}

export default CountingClockComponent
