import { useRef, useState } from 'react'

import RegressiveSvg from '@assets/svg/regressive.svg'
import { TActivityStatus, TTimerStatus } from '@common/interfaces/timers'
import TimerDisplay from '@components/TimerDisplay'
import { useTimerSoundsRef } from '@contexts/timers/useTimerSounds'
import { RegressiveTimer, TabataTimer } from '@utils/timer'
import dayjs from 'dayjs'

export interface TabataDisplayProps {
    work: number
    rest: number
    rounds: number
    initialCountdown: number
    onPressReset(): void
}

const TabataDisplay: React.FC<TabataDisplayProps> = ({
    work,
    rest,
    rounds,
    initialCountdown: _initialCountdown,
    onPressReset,
}) => {
    const [currentTime, setCurrentTime] = useState(work)
    const [currentRound, setCurrentRound] = useState(1)
    const [currentActivityStatus, setCurrentActivityStatus] = useState<TActivityStatus>('work')
    const [currentStatus, setCurrentStatus] = useState<TTimerStatus>('initial')
    const [initialCountdown, setInitialCountdown] = useState<number | undefined>(_initialCountdown)

    const clockRef = useRef<TabataTimer>()
    const initialCountdownRef = useRef<RegressiveTimer>()
    const [beepSoundRef, startSoundRef, finishSoundRef] = useTimerSoundsRef()

    const handlePressPlayButton = () => {
        if (currentStatus === 'initial') setupTimer()

        if (initialCountdown && currentStatus === 'initial') {
            setCurrentStatus('running')

            const countdownTimer = setupCountdown()
            countdownTimer.start()

            countdownTimer.once('end', () => {
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
        clockRef.current = new TabataTimer(work, rest, rounds)

        clockRef.current.on('changeStatus', (status) => {
            console.log(status)
            setCurrentStatus(status)
        })

        clockRef.current.once('start', () => {
            startSoundRef.current?.playFromPositionAsync(0)
        })

        clockRef.current.on('changeRound', (current: number) => {
            setCurrentRound(current)
        })
        clockRef.current.on('changeActivityStatus', (current: TActivityStatus, status: TTimerStatus) => {
            if (status === 'running') startSoundRef.current?.playFromPositionAsync(0)
            setCurrentActivityStatus(current)
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
            activityStatus={currentActivityStatus}
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

export default TabataDisplay
