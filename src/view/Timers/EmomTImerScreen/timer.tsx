import { useRef, useState } from 'react'

import RegressiveSvg from '@assets/svg/regressive.svg'
import { TTimerStatus } from '@common/interfaces/timers'
import TimerDisplay from '@components/TimerDisplay'
import { useTimerSoundsRef } from '@contexts/timers/useTimerSounds'
import { EmomTimer, RegressiveTimer } from '@utils/timer'
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
    const [currentTime, setCurrentTime] = useState(each)
    const [currentRound, setCurrentRound] = useState(1)
    const [currentStatus, setCurrentStatus] = useState<TTimerStatus>('initial')
    const [initialCountdown, setInitialCountdown] = useState<number | undefined>(_initialCountdown)

    const clockRef = useRef<EmomTimer>()
    const initialCountdownRef = useRef<RegressiveTimer>()
    const [beepSoundRef, startSoundRef, finishSoundRef] = useTimerSoundsRef()

    const handlePressPlayButton = () => {
        if (currentStatus === 'initial') {
            setCurrentStatus('running')

            const countdownTimer = setupCountdown()
            countdownTimer.start()

            countdownTimer.once('end', () => {
                const timer = setupTimer()
                timer.start()
            })
            return
        }

        clockRef.current?.start()
    }

    const handlePressResetButton = () => {
        setInitialCountdown(_initialCountdown)
        setCurrentTime(0)
        clockRef.current?.reset()
    }

    const setupTimer = () => {
        clockRef.current = new EmomTimer(each, rounds)

        clockRef.current.on('changeStatus', (status) => {
            setCurrentStatus(status)
        })

        clockRef.current.on('changeRound', (current: number) => {
            if (currentStatus === 'running') startSoundRef.current?.playFromPositionAsync(0)
            setCurrentRound(current)
        })

        clockRef.current.on('end', () => {
            finishSoundRef.current?.playFromPositionAsync(0)
        })

        clockRef.current.on('tick', (duration: number) => {
            setCurrentTime(duration)
        })

        clockRef.current.on('reset', () => {
            setCurrentTime(0)
        })

        return clockRef.current
    }

    const setupCountdown = () => {
        initialCountdownRef.current = new RegressiveTimer(_initialCountdown)

        initialCountdownRef.current.once('end', () => {
            startSoundRef.current?.playFromPositionAsync(0)
        })

        initialCountdownRef.current.once('start', () => {
            beepSoundRef.current?.playFromPositionAsync(0)
        })

        initialCountdownRef.current.on('tick', (displayTime: number) => {
            setInitialCountdown((prev) => {
                if (displayTime > 0 && displayTime != prev) beepSoundRef.current?.playFromPositionAsync(0)

                return displayTime
            })
        })

        return initialCountdownRef.current
    }

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
