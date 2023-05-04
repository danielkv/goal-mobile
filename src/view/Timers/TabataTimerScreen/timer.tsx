import { useEffect, useRef, useState } from 'react'

import TabataSvg from '@assets/svg/tabata.svg'
import { TActivityStatus, TTimerStatus } from '@common/interfaces/timers'
import TimerDisplay from '@components/TimerDisplay'
import { useTimer } from '@contexts/timers/useTimer'
import { TabataTimer } from '@utils/timer'
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
    const [currentRound, setCurrentRound] = useState(1)
    const [currentActivityStatus, setCurrentActivityStatus] = useState<TActivityStatus>('work')

    const clockRef = useRef<TabataTimer>()

    useEffect(() => {
        clockRef.current = new TabataTimer(work, rest, rounds)

        return () => {
            clockRef.current?.stop()
        }
    }, [])

    const { currentStatus, currentTime, handlePressPlayButton, handlePressResetButton, initialCountdown } = useTimer({
        clockRef,
        initialCountdown: _initialCountdown,
        initialCurrentTime: work,
        onSetupTimer: (clockRef, sounds) => {
            clockRef.current?.on('changeActivityStatus', (current: TActivityStatus, status: TTimerStatus) => {
                if (status === 'running') sounds.playRoundChange()
                setCurrentActivityStatus(current)
            })
            clockRef.current?.on('changeRound', (current: number) => {
                setCurrentRound(current)
            })
        },
    })

    return (
        <TimerDisplay
            time={dayjs.duration(currentTime, 'seconds').format('mm:ss')}
            Icon={TabataSvg}
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
