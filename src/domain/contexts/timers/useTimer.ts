import { RefObject, useEffect, useRef, useState } from 'react'

import { TTimerStatus } from '@common/interfaces/timers'
import { UseTimerSounds, useTimerSoundsRef } from '@contexts/timers/useTimerSounds'
import { RegressiveTimer, StopwatchTimer } from '@utils/timer'

interface Args {
    initialCurrentTime?: number
    initialCountdown: number
    clockRef: RefObject<StopwatchTimer | undefined>
    onSetupTimer?: (clockRef: RefObject<StopwatchTimer | undefined>, sounds: UseTimerSounds) => void
}

export function useTimer({ initialCountdown: _initialCountdown, clockRef, onSetupTimer, initialCurrentTime }: Args) {
    const [currentTime, setCurrentTime] = useState(initialCurrentTime || 0)
    const [currentStatus, setCurrentStatus] = useState<TTimerStatus>('initial')
    const [initialCountdown, setInitialCountdown] = useState<number | null>(_initialCountdown)

    const initialCountdownRef = useRef<RegressiveTimer>()
    const sounds = useTimerSoundsRef()

    useEffect(() => {
        return () => {
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
        clockRef.current?.on('changeStatus', (status) => {
            setCurrentStatus(status)
        })

        clockRef.current?.on('end', () => {
            sounds.playFinish()
        })

        clockRef.current?.on('tick', (duration: number) => {
            setCurrentTime(duration)
        })

        clockRef.current?.once('start', () => {
            sounds.playStart()
        })

        clockRef.current?.on('reset', () => {
            setCurrentTime(0)
            setCurrentStatus('initial')
            setInitialCountdown(_initialCountdown)
        })

        onSetupTimer?.(clockRef, sounds)

        return clockRef.current
    }

    const setupCountdown = () => {
        initialCountdownRef.current = new RegressiveTimer(_initialCountdown)

        initialCountdownRef.current.once('start', () => {
            sounds.playBeep()
        })

        initialCountdownRef.current.on('tick', (displayTime: number) => {
            setInitialCountdown((prev) => {
                if (displayTime > 0 && displayTime != prev) sounds.playBeep()

                return displayTime
            })
        })

        return initialCountdownRef.current
    }

    return {
        currentTime,
        currentStatus,
        initialCountdown,

        sounds,

        handlePressPlayButton,
        handlePressResetButton,
    }
}
