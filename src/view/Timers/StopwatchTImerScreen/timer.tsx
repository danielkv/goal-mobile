import { useEffect, useRef, useState } from 'react'

import RegressiveSvg from '@assets/svg/regressive.svg'
import { TTimerStatus } from '@common/interfaces/timers'
import TimerDisplay from '@components/TimerDisplay'
import { useTimerSoundsRef } from '@contexts/timers/useTimerSounds'
import { RegressiveTimer, StopwatchTimer } from '@utils/timer'
import dayjs from 'dayjs'

export interface StopwatchDisplayProps {
    finalTime: number
    initialCountdown: number
    onPressReset(): void
}

const StopwatchDisplay: React.FC<StopwatchDisplayProps> = ({
    finalTime,
    initialCountdown: _initialCountdown,
    onPressReset,
}) => {
    const [currentTime, setCurrentTime] = useState(0)
    const [currentStatus, setCurrentStatus] = useState<TTimerStatus>('initial')
    const [initialCountdown, setInitialCountdown] = useState<number | null>(_initialCountdown)

    const clockRef = useRef<StopwatchTimer>()
    const initialCountdownRef = useRef<RegressiveTimer>()
    const [beepSoundRef, startSoundRef, finishSoundRef] = useTimerSoundsRef()

    useEffect(() => {
        return () => {
            clockRef.current?.stop()
            initialCountdownRef.current?.stop()
        }
    }, [])

    const handlePressPlayButton = () => {
        if (currentStatus === 'initial') setupTimer()

        if (initialCountdown && currentStatus === 'initial') {
            setCurrentStatus('running')

            const countdownTimer = setupCountdown()
            countdownTimer.start()

            countdownTimer.once('end', () => {
                setInitialCountdown(null)
                clockRef.current?.start()
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
        clockRef.current = new StopwatchTimer(finalTime)

        clockRef.current.on('changeStatus', (status) => {
            setCurrentStatus(status)
        })

        clockRef.current.on('end', () => {
            finishSoundRef.current?.playFromPositionAsync(0)
        })

        clockRef.current.on('tick', (duration: number) => {
            setCurrentTime(duration)
        })

        clockRef.current.on('reset', () => {
            setCurrentTime(0)
            setCurrentStatus('initial')
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

export default StopwatchDisplay
