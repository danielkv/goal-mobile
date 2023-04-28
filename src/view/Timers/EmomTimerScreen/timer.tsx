import { useEffect, useRef, useState } from 'react'

import RegressiveSvg from '@assets/svg/regressive.svg'
import TimerDisplay from '@components/TimerDisplay'
import { useTimer } from '@contexts/timers/useTimer'
import { EmomTimer } from '@utils/timer'
import dayjs from 'dayjs'

export interface EmomDisplayProps {
    each: number
    rounds: number
    initialCountdown: number
    onPressReset(): void
}

const EmomDisplay: React.FC<EmomDisplayProps> = ({
    each,
    rounds,
    initialCountdown: _initialCountdown,
    onPressReset,
}) => {
    const [currentRound, setCurrentRound] = useState(1)

    const clockRef = useRef<EmomTimer>()

    useEffect(() => {
        clockRef.current = new EmomTimer(each, rounds)

        return () => {
            clockRef.current?.stop()
        }
    }, [])

    const { currentStatus, currentTime, handlePressPlayButton, handlePressResetButton, initialCountdown } = useTimer({
        clockRef,
        initialCountdown: _initialCountdown,
        initialCurrentTime: each,
        onSetupTimer: (clockRef, sounds) => {
            clockRef.current?.on('changeRound', (current: number) => {
                if (currentStatus === 'running') sounds.playRoundChange()
                setCurrentRound(current)
            })
        },
    })

    return (
        <TimerDisplay
            time={dayjs.duration(currentTime, 'seconds').format('mm:ss')}
            Icon={RegressiveSvg}
            round={currentRound}
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

export default EmomDisplay
