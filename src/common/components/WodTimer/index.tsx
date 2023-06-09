import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useOrientation } from '@common/hooks/useOrientation'
import { TActivityStatus, TTimerStatus } from '@common/interfaces/timers'
import Button from '@components/Button'
import TimerDisplay from '@components/TimerDisplay'
import { useTimer } from '@contexts/timers/useTimer'
import { MaterialIcons } from '@expo/vector-icons'
import { IEventBlock, IRound } from '@models/block'
import { useNavigation } from '@react-navigation/native'
import { EmomTimer, RegressiveTimer, StopwatchTimer, TabataTimer } from '@utils/timer'

import dayjs from 'dayjs'
import { Stack, YStack } from 'tamagui'
import { useTheme } from 'tamagui'

import RoundDisplay from './RoundDisplay'

export interface IWodTimerProps {}

const block: IEventBlock = {
    event_type: 'not_timed',
    numberOfRounds: 2,
    rounds: [
        {
            numberOfRounds: 2,
            each: 5,
            movements: [
                {
                    name: 'DB snatch',
                    reps: '10',
                },
                {
                    reps: '10',
                    name: 'Box jump over',
                },
                {
                    name: 'T2B',

                    reps: '10',
                },
            ],
            type: 'emom',
        },
        {
            time: 5,
            movements: [],
            type: 'rest',
        },
        {
            numberOfRounds: 1,
            movements: [
                {
                    name: 'DB hang clean e jerk',
                    reps: '10',
                },
                {
                    reps: '10',
                    name: 'box step over',
                },
                {
                    name: 'Pull Up',
                    reps: '10',
                },
            ],
            timecap: 5,
            type: 'amrap',
        },
        {
            time: 5,
            movements: [],
            type: 'rest',
        },
    ],
    type: 'event',
}

function flattenRounds(block: IEventBlock): IRound[] {
    const flattened = Array.from({ length: block.numberOfRounds || 1 }).flatMap(() =>
        block.rounds.flatMap((round) =>
            Array.from({
                length: !['emom', 'tabata'].includes(round.type) && round.numberOfRounds ? round.numberOfRounds : 1,
            }).map(() => round)
        )
    )

    if (flattened.at(-1)?.type === 'rest') flattened.splice(-1, 1)

    return flattened
}

const WodTimer: React.FC<IWodTimerProps> = () => {
    const orientation = useOrientation()
    const isPortrait = orientation === 'portrait'
    const navigation = useNavigation()
    const theme = useTheme()

    const [currentRound, setCurrentRound] = useState<number | null>(null)
    const [totalRounds, setTotalRounds] = useState<number | null>(null)
    const [activityStatus, setActivityStatus] = useState<'work' | 'rest' | null>(null)

    const rounds = useMemo(() => flattenRounds(block), [])

    const [selectedRound, setSelectedRound] = useState(0)

    const clockRef = useRef<StopwatchTimer>()

    const { currentStatus, currentTime, handlePressPlayButton, handlePressResetButton, initialCountdown, sounds } =
        useTimer({
            clockRef,
            initialCountdown: 3,
        })

    const nextTimer = useCallback(
        (currRound: number) => {
            clockRef.current?.stop()

            const nextRound = currRound + 1

            if (nextRound >= rounds.length) return

            setSelectedRound(nextRound)

            setupNewTimer(nextRound)

            handlePressPlayButton()
        },
        [clockRef, setSelectedRound]
    )

    const setupNewTimer = useCallback(
        (currRound: number) => {
            const round = rounds[currRound]

            const countdown = currRound === 0 ? 3 : 0
            setCurrentRound(null)

            setActivityStatus('work')

            switch (round.type) {
                case 'amrap':
                    clockRef.current = new RegressiveTimer(round.timecap)
                    handlePressResetButton({ initialCountdown: countdown, initialCurrentTime: round.timecap })
                    break
                case 'for_time':
                    clockRef.current = new StopwatchTimer(round.timecap)
                    break
                case 'rest':
                    clockRef.current = new RegressiveTimer(round.time)
                    handlePressResetButton({ initialCountdown: countdown, initialCurrentTime: round.time })
                    setActivityStatus('rest')
                    break
                case 'emom':
                    clockRef.current = new EmomTimer(round.each, round.numberOfRounds)
                    if (round.numberOfRounds > 1) {
                        clockRef.current?.on('changeRound', (current: number) => {
                            if (currentStatus === 'running') sounds.playRoundChange()
                            setCurrentRound(current)
                        })
                        setCurrentRound(1)
                        setTotalRounds(round.numberOfRounds)
                    }
                    handlePressResetButton({ initialCountdown: countdown, initialCurrentTime: round.each })
                    break
                case 'tabata':
                    clockRef.current = new TabataTimer(round.work, round.rest, round.numberOfRounds)
                    if (round.numberOfRounds > 1) {
                        clockRef.current?.on('changeRound', (current: number) => {
                            if (currentStatus === 'running') sounds.playRoundChange()
                            setCurrentRound(current)
                        })
                        setCurrentRound(1)
                        setTotalRounds(round.numberOfRounds)
                    }

                    clockRef.current?.on('changeActivityStatus', (current: TActivityStatus, status: TTimerStatus) => {
                        if (status === 'running') sounds.playRoundChange()
                        setActivityStatus(current)
                    })
                    handlePressResetButton({ initialCountdown: countdown, initialCurrentTime: round.work })
                    break
            }

            clockRef.current?.on('end', () => {
                nextTimer(currRound)
            })
        },
        [clockRef, nextTimer, rounds]
    )

    const handleResetWodTimer = useCallback(() => {
        clockRef.current?.stop()

        setupNewTimer(0)
        setSelectedRound(0)

        handlePressResetButton()
    }, [])

    useEffect(() => {
        setupNewTimer(selectedRound)

        return () => {
            clockRef.current?.stop()
        }
    }, [])

    useEffect(() => {
        if (!isPortrait) navigation.setOptions({ headerShown: false })
        else navigation.setOptions({ headerShown: true })
    }, [isPortrait])

    return (
        <Stack f={1} flexDirection={isPortrait ? 'column' : 'row'}>
            <YStack jc="center" ai="center" p="$7">
                {!isPortrait && (
                    <Stack position="absolute" top={0} left={0}>
                        <Button
                            circular
                            transparent
                            mt="$2"
                            icon={<MaterialIcons name="chevron-left" size={40} color={theme.gray2.val} />}
                        />
                    </Stack>
                )}
                <Stack>
                    <RoundDisplay rounds={rounds} selected={selectedRound} />
                </Stack>
            </YStack>
            <Stack bg="$gray9" f={1} btlr="$6" bblr={!isPortrait ? '$6' : 0} btrr={isPortrait ? '$6' : 0}>
                <TimerDisplay
                    time={dayjs.duration(currentTime, 'seconds').format('mm:ss')}
                    round={currentRound}
                    totalRounds={totalRounds}
                    activityStatus={activityStatus}
                    initialCountdown={initialCountdown ? String(initialCountdown) : null}
                    watchProgressStatus={currentStatus}
                    onPressPlayButton={handlePressPlayButton}
                    onPressResetButton={handleResetWodTimer}
                    onPressPauseButton={() => {
                        clockRef.current?.stop()
                    }}
                />
            </Stack>
        </Stack>
    )
}

export default WodTimer
