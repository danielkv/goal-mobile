import { useEffect, useRef } from 'react'

import RegressiveSvg from '@assets/svg/regressive.svg'
import TimerDisplay from '@components/TimerDisplay'
import { useTimer } from '@contexts/timers/useTimer'
import { RegressiveTimer } from '@utils/timer'
import dayjs from 'dayjs'

export interface RegressiveDisplayProps {
    initialTime: number
    initialCountdown: number
    onPressReset(): void
}

const RegressiveDisplay: React.FC<RegressiveDisplayProps> = ({
    initialTime,
    initialCountdown: _initialCountdown,
    onPressReset,
}) => {
    const clockRef = useRef<RegressiveTimer>()

    useEffect(() => {
        clockRef.current = new RegressiveTimer(initialTime)
        return () => {
            clockRef.current?.stop()
        }
    }, [])

    const { currentStatus, currentTime, handlePressPlayButton, handlePressResetButton, initialCountdown } = useTimer({
        clockRef,
        initialCountdown: _initialCountdown,
    })

    return (
        <TimerDisplay
            time={dayjs.duration(currentTime, 'second').format('mm:ss')}
            Icon={RegressiveSvg}
            onPressEditButton={onPressReset}
            initialCountdown={initialCountdown ? dayjs.duration(initialCountdown, 'seconds').format('s') : undefined}
            watchProgressStatus={currentStatus}
            onPressPlayButton={handlePressPlayButton}
            onPressResetButton={handlePressResetButton}
            onPressPauseButton={() => {
                clockRef.current?.stop()
            }}
        />
    )
}

export default RegressiveDisplay
