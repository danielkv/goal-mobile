import { useState } from 'react'
import { useWindowDimensions } from 'react-native'

import { Center } from 'native-base'

import RegressiveSvg from '@assets/svg/regressive.svg'
import { TWatchProgressStatus, TWeatherActivityStatus } from '@common/interfaces/timers'
import CountingClockComponent from '@components/CountingClock'

const RegressiveTimerScreen: React.FC = () => {
    const { width, height } = useWindowDimensions()
    const isPortrait = height > width

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
        <>
            {isPortrait ? (
                <Center width={'100%'}>
                    <CountingClockComponent
                        time="00:00.000"
                        Icon={RegressiveSvg}
                        isPortrait={isPortrait}
                        numberRounds={count}
                        onPressWatchStartButton={() => setCount(count + 1)}
                        onPressClockEditButton={() => handleStatus()}
                        onPressResetTimeButton={handleWatchProgressStatus}
                        onPressTimePauseButton={() => setCount(count + 1)}
                        isTabata
                        hasRound
                        weatherActivityStatus={weatherActivityStatus}
                        watchProgressStatus={watchProgressStatus}
                    />
                </Center>
            ) : (
                <Center width={'100%'}>
                    <CountingClockComponent time="00:00.000" Icon={RegressiveSvg} isPortrait={isPortrait} />
                </Center>
            )}
        </>
    )
}

export default RegressiveTimerScreen
