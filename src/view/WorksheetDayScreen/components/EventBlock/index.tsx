import React from 'react'

import { Box, Text, VStack } from 'native-base'

import EventBlockRound from './Round'
import { IEventBlock } from '@models/block'
import { eventTypesMap, getTimeCap } from '@utils/worksheet'

export interface PeriodEventBlock {
    block: IEventBlock
}

const EventBlock: React.FC<PeriodEventBlock> = ({ block }) => {
    return (
        <Box alignItems="center">
            {!!block.name && <Text>{block.name}</Text>}
            {block.event_type !== 'not_timed' && (
                <Text bg="gray.900" px={5} py={1} mb={1} textAlign="center">
                    {eventTypesMap[block.event_type]} {getTimeCap(block)}
                </Text>
            )}
            <VStack>
                {block.rounds?.map((round) => (
                    <EventBlockRound round={round} />
                ))}
            </VStack>
        </Box>
    )
}

export default EventBlock
