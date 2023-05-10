import { useMemo } from 'react'

import { Box, Text, VStack } from 'native-base'

import EventBlockMovement from '@components/EventBlockMovement'
import { IRound } from '@models/block'
import { roundTransformer } from '@utils/transformer/round'

export interface EventBlockRoundProps {
    round: IRound
    textAlign?: 'center' | 'left'
}

const EventBlockRound: React.FC<EventBlockRoundProps> = ({ round, textAlign = 'center' }) => {
    const sequenceReps = useMemo(() => roundTransformer.findSequenceReps(round.movements), [])

    const roundTitle = roundTransformer.displayTitle(round, sequenceReps?.join('-'))

    return (
        <Box bg="gray.800" rounded="md" p={2}>
            {!!roundTitle && (
                <Text textAlign={textAlign} fontWeight="bold" fontSize="sm">
                    {roundTitle}
                </Text>
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
