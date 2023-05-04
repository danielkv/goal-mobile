import { Box, Text, VStack } from 'native-base'

import EventBlockMovement from '@components/EventBlockMovement'
import { IEventRound } from '@models/block'
import { numberHelper } from '@utils/numbers'

export interface EventBlockRoundProps {
    round: IEventRound
    textAlign?: 'center' | 'left'
}

const EventBlockRound: React.FC<EventBlockRoundProps> = ({ round, textAlign = 'center' }) => {
    return (
        <Box bg="gray.800" rounded="md" p={2}>
            {!!round.name && (
                <Text textAlign={textAlign} color="gray.100" fontSize="sm">
                    {round.name}
                </Text>
            )}
            {!!round.repeat && (
                <Text textAlign={textAlign} fontWeight="bold" fontSize="sm">
                    {numberHelper.convertNumbers(round.repeat)}
                </Text>
            )}
            <VStack alignItems={textAlign === 'center' ? 'center' : 'flex-start'}>
                {round.movements.map((movement, index) => (
                    <Box key={`${movement.name}.${index}`}>
                        <EventBlockMovement movement={movement} textAlign={textAlign} />
                    </Box>
                ))}
            </VStack>
        </Box>
    )
}

export default EventBlockRound
