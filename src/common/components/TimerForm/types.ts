import { SvgProps } from 'react-native-svg'

import { TActivityStatus, TWatchProgressStatus } from '@common/interfaces/timers'

export interface CountingClockProps {
    time: string
    Icon: React.FC<SvgProps>
    numberRounds?: number
    weatherActivityStatus?: TActivityStatus
    watchProgressStatus: TWatchProgressStatus
    onPressPlayButton: () => void
    onPressEditButton: () => void
    onPressPauseButton: () => void
    onPressResetButton: () => void
}
