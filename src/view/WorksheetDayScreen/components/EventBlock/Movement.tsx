import React from 'react'

import { Box, Pressable, Text } from 'native-base'

import { EventMovement } from '@models/block'
import { displayWeight, getRoundsDisplay } from '@utils/worksheet'

export interface EventBlockMovementProps {
    movement: EventMovement
}

const EventBlockMovement: React.FC<EventBlockMovementProps> = ({ movement }) => {
    const weight = displayWeight(movement.weight)
    const reps = getRoundsDisplay(movement.reps, '')
    const repsDisplay = reps && reps !== '0' ? `${reps} ` : ''
    const displayMovement = `${repsDisplay}${movement.name}${weight}`

    return (
        <Box>
            {movement.videoUrl ? (
                <Pressable>
                    <Text color="gray.300" fontSize="xs" textAlign="center">
                        {displayMovement}
                    </Text>
                </Pressable>
            ) : (
                <Text fontSize="xs" color="gray.300" textAlign="center">
                    {displayMovement}
                </Text>
            )}
        </Box>
    )
}

export default EventBlockMovement
