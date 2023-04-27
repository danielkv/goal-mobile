import { useEffect, useRef, useState } from 'react'

import RegressiveSvg from '@assets/svg/regressive.svg'
import TimerDisplay from '@components/TimerDisplay'
import { RegressiveTimer, TTimerStatus } from '@utils/timer'
import dayjs from 'dayjs'

export interface RegressiveTimerTimerProps {
    initialTime1: number
    onPressReset(): void
}

const RegressiveTimerTimer: React.FC<RegressiveTimerTimerProps> = ({ initialTime1, onPressReset }) => {
    const [currentTime, setCurrentTime] = useState(initialTime1)
    const [currentStatus, setCurrentStatus] = useState<TTimerStatus>('initial')

    const clockRef = useRef<RegressiveTimer>()

    useEffect(() => {
        clockRef.current = new RegressiveTimer(initialTime1)

        clockRef.current.on('changeStatus', (status) => {
            setCurrentStatus(status)
        })

        clockRef.current.on('tick', (duration: number, start, current) => {
            setCurrentTime(duration)
        })

        clockRef.current.on('reset', () => {
            setCurrentTime(initialTime1)
        })
    }, [])

    return (
        <TimerDisplay
            time={dayjs.duration(currentTime, 'second').format('mm:ss')}
            Icon={RegressiveSvg}
            onPressEditButton={onPressReset}
            watchProgressStatus={currentStatus}
            onPressPlayButton={() => {
                clockRef.current?.start()
            }}
            onPressResetButton={() => {
                clockRef.current?.reset()
            }}
            onPressPauseButton={() => {
                clockRef.current?.stop()
            }}
        />
    )
}

export default RegressiveTimerTimer
