import React from 'react'

import { Box, Text } from 'native-base'

import EventBlockMovement from './Movement'
import { EventRound } from '@models/block'
import { getRoundsDisplay } from '@utils/worksheet'

export interface EventBlockRoundProps {
    round: EventRound
}

const EventBlockRound: React.FC<EventBlockRoundProps> = ({ round }) => {
    return (
        <Box>
            <Box mb={5}>
                {!!round.name && (
                    <Text textAlign="left" color="gray.100" fontSize="sm">
                        {round.name}
                    </Text>
                )}
                {!!round.repeat && (
                    <Text textAlign="left" fontWeight="bold" fontSize="sm">
                        {getRoundsDisplay(round.repeat)}
                    </Text>
                )}
            </Box>
            <Box>
                {round.movements.map((movement) => (
                    <EventBlockMovement movement={movement} />
                ))}
            </Box>
        </Box>
    )
}

export default EventBlockRound
