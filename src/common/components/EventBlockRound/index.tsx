import { useMemo } from 'react'

import { Box, Text, VStack } from 'native-base'

import EventBlockMovement from '@components/EventBlockMovement'
import OpenTimerButton, { OpenTimerButtonProps } from '@components/OpenTimerButton'
import { IRound } from '@models/block'
import { TTimerTypes } from '@models/time'
import { roundTransformer } from '@utils/transformer/round'

export interface EventBlockRoundProps {
    round: IRound
    textAlign?: 'center' | 'left'
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

const EventBlockRound: React.FC<EventBlockRoundProps> = ({ round, textAlign = 'center' }) => {
    const sequenceReps = useMemo(() => roundTransformer.findSequenceReps(round.movements), [])

    const roundTitle = roundTransformer.displayTitle(round, sequenceReps?.join('-'))

    const timerType = getTimerType(round)

    return (
        <Box bg="gray.800" rounded="md" p={2}>
            {!!roundTitle && (
                <Text textAlign={textAlign} fontWeight="bold" fontSize="sm">
                    {roundTitle}
                </Text>
            )}

            {!!timerType && (
                <Box position="absolute" top={1} right={1}>
                    <OpenTimerButton variant="icon" type={timerType} settings={getTimerSettings(round)} />
                </Box>
            )}
            {!['complex', 'rest'].includes(round.type) ? (
                <VStack alignItems={textAlign === 'center' ? 'center' : 'flex-start'}>
                    {round.movements.map((movement, index) => (
                        <Box key={`${movement.name}.${index}`}>
                            <EventBlockMovement hideReps={!!sequenceReps} movement={movement} textAlign={textAlign} />
                        </Box>
                    ))}
                </VStack>
            ) : round.type === 'complex' ? (
                <Text textBreakStrategy="balanced" fontSize="sm" color="gray.300" textAlign={textAlign}>
                    {roundTransformer.displayComplex(round)}
                </Text>
            ) : (
                <Text textBreakStrategy="balanced" fontSize="sm" color="gray.300" textAlign={textAlign}>
                    {roundTransformer.displayRestRound(round)}
                </Text>
            )}
        </Box>
    )
}

export default EventBlockRound
