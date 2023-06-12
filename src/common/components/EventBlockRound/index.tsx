import { useMemo } from 'react'

import EventBlockMovement from '@components/EventBlockMovement'
import OpenTimerButton, { OpenTimerButtonProps } from '@components/OpenTimerButton'
import { IRound } from '@models/block'
import { TTimerTypes } from '@models/time'
import { roundTransformer } from '@utils/transformer/round'

import { Stack, Text, YStack } from 'tamagui'

export interface EventBlockRoundProps {
    round: IRound
    textAlign?: 'center' | 'left'
    showTimerButton?: boolean
}

const getTimerSettings = (round: IRound): OpenTimerButtonProps['settings'] => {
    switch (round.type) {
        case 'amrap':
        case 'for_time':
            return {
                numberOfRounds: round.numberOfRounds,
                timecap: round.timecap,
            }
        case 'emom':
            return {
                numberOfRounds: round.numberOfRounds,
                each: round.each,
            }
        case 'tabata':
            return {
                numberOfRounds: round.numberOfRounds,
                work: round.work,
                rest: round.rest,
            }
    }

    return {}
}

const getTimerType = (round: IRound): Exclude<TTimerTypes, 'not_timed'> | null => {
    switch (round.type) {
        case 'emom':
            if (round.each && round.each > 0 && round.numberOfRounds && round.numberOfRounds > 0) return 'emom'
            break
        case 'tabata':
            if (
                round.work &&
                round.work > 0 &&
                round.rest &&
                round.rest > 0 &&
                round.numberOfRounds &&
                round.numberOfRounds > 0
            )
                return 'tabata'
            break
        case 'for_time':
        case 'amrap':
            if (round.timecap && round.timecap > 0) return 'for_time'
            break
    }
    return null
}

const EventBlockRound: React.FC<EventBlockRoundProps> = ({ round, textAlign = 'center', showTimerButton = false }) => {
    const sequenceReps = useMemo(() => roundTransformer.findSequenceReps(round.movements), [])

    const roundTitle = roundTransformer.displayTitle(round, sequenceReps?.join('-'))

    const timerType = getTimerType(round)

    return (
        <Stack bg="$gray8" br="$2" p="$2">
            {!!roundTitle && (
                <Text textAlign={textAlign} fontWeight="bold" fontSize="$4">
                    {roundTitle}
                </Text>
            )}

            {showTimerButton && !!timerType && (
                <Stack position="absolute" top={1} right={1}>
                    <OpenTimerButton variant="icon" type={timerType} settings={getTimerSettings(round)} />
                </Stack>
            )}
            {!['complex', 'rest'].includes(round.type) ? (
                <YStack ai={textAlign === 'center' ? 'center' : 'flex-start'}>
                    {round.movements.map((movement, index) => (
                        <EventBlockMovement
                            key={`${movement.name}.${index}`}
                            hideReps={!!sequenceReps}
                            movement={movement}
                            textAlign={textAlign}
                        />
                    ))}
                </YStack>
            ) : round.type === 'complex' ? (
                <Text textBreakStrategy="balanced" fontSize="$4" color="$gray3" ta={textAlign}>
                    {roundTransformer.displayComplex(round)}
                </Text>
            ) : (
                <Text textBreakStrategy="balanced" fontSize="$4" color="$gray3" ta={textAlign}>
                    {roundTransformer.displayRestRound(round)}
                </Text>
            )}
        </Stack>
    )
}

export default EventBlockRound
