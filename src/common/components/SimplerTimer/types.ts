import { SvgProps } from 'react-native-svg'

import { TWatchProgressStatus, TWeatherActivityStatus } from '@common/interfaces/timers'

export interface CountingClockProps {
    time: string
    Icon: React.FC<SvgProps>
    numberRounds?: number
    weatherActivityStatus?: TWeatherActivityStatus
    watchProgressStatus: TWatchProgressStatus
    onPressPlayButton: () => void
    onPressEditButton: () => void
    onPressPauseButton: () => void
    onPressResetButton: () => void
}
