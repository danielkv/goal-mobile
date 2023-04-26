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
            {!!round.name && (
                <Text textAlign="center" color="gray.100" fontSize="sm">
                    {round.name}
                </Text>
            )}
            {!!round.repeat && (
                <Text textAlign="center" fontWeight="bold" fontSize="sm">
                    {getRoundsDisplay(round.repeat)}
                </Text>
            )}
            <Box>
                {round.movements.map((movement) => (
                    <EventBlockMovement movement={movement} />
                ))}
            </Box>
        </Box>
    )
}

export default EventBlockRound
