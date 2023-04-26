import { useState } from 'react'

import { Center } from 'native-base'

import RegressiveSvg from '@assets/svg/regressive.svg'
import { TWatchProgressStatus, TWeatherActivityStatus } from '@common/interfaces/timers'
import CountingClockComponent from '@components/CountingClock'
import SimplerTimer from '@components/SimplerTimer'

const RegressiveTimerScreen: React.FC = () => {
    const [count, setCount] = useState(0)
    const [weatherActivityStatus, setWeatherActivityStatus] = useState<TWeatherActivityStatus>('work')
    const [watchProgressStatus, setWatchProgressStatus] = useState<TWatchProgressStatus>('running')

    const handleStatus = () => {
        setWeatherActivityStatus((prev) => {
            return prev === 'rest' ? 'work' : 'rest'
        })
        setWatchProgressStatus((prev) => {
            return prev === 'stopped' ? 'running' : 'stopped'
        })
    }

    const handleWatchProgressStatus = () => {
        setWeatherActivityStatus((prev) => {
            return prev === 'rest' ? 'work' : 'rest'
        })
        setWatchProgressStatus((prev) => {
            return prev === 'stopped' ? 'running' : 'stopped'
        })
    }

    return (
        <Center flex={1}>
            <SimplerTimer
                time="00:00:000"
                Icon={RegressiveSvg}
                numberRounds={count}
                onPressPlayButton={() => setCount(count + 1)}
                onPressEditButton={() => handleStatus()}
                onPressResetButton={handleWatchProgressStatus}
                onPressPauseButton={() => setCount(count + 1)}
                //weatherActivityStatus={weatherActivityStatus}
                watchProgressStatus={'initial'}
            />
        </Center>
    )
}

export default RegressiveTimerScreen
