import { useEffect, useRef, useState } from 'react'

import RegressiveSvg from '@assets/svg/regressive.svg'
import TimerDisplay from '@components/TimerDisplay'
import { StopwatchTimer, TTimerStatus } from '@utils/timer'
import dayjs from 'dayjs'

export interface StopwatchDisplayProps {
    finalTime: number
    onPressReset(): void
}

const StopwatchDisplay: React.FC<StopwatchDisplayProps> = ({ finalTime, onPressReset }) => {
    const [currentTime, setCurrentTime] = useState(0)
    const [currentStatus, setCurrentStatus] = useState<TTimerStatus>('initial')

    const clockRef = useRef<StopwatchTimer>()

    useEffect(() => {
        clockRef.current = new StopwatchTimer(finalTime)

        clockRef.current.on('changeStatus', (status) => {
            setCurrentStatus(status)
        })

        clockRef.current.on('tick', (duration: number, start, current) => {
            setCurrentTime(duration)
        })

        clockRef.current.on('reset', () => {
            setCurrentTime(0)
        })
    }, [])

    return (
        <TimerDisplay
            time={dayjs.duration(currentTime, 'seconds').format('mm:ss')}
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

export default StopwatchDisplay
