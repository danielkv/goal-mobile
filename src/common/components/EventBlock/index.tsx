import { Text, VStack } from 'native-base'

import EventBlockRound from '@components/EventBlockRound'
import { IEventBlock } from '@models/block'
import { eventTypesMap, getTimeCap } from '@utils/worksheet'

export interface PeriodEventBlock {
    block: IEventBlock
    textAlign?: 'center' | 'left'
}

const EventBlock: React.FC<PeriodEventBlock> = ({ block, textAlign = 'center' }) => {
    return (
        <>
            {!!block.name && (
                <Text fontSize="xs" textAlign={textAlign}>
                    {block.name}
                </Text>
            )}
            {block.event_type !== 'not_timed' &&
                (textAlign === 'center' ? (
                    <Text bg={'gray.900'} px={5} py={1} mb={1} fontSize="xs" textAlign={textAlign}>
                        {eventTypesMap[block.event_type]} {getTimeCap(block)}
                    </Text>
                ) : (
                    <Text fontSize="xs" textAlign={textAlign}>
                        {eventTypesMap[block.event_type]} {getTimeCap(block)}
                    </Text>
                ))}
            <VStack>
                {block.rounds.map((round, index) => (
                    <EventBlockRound key={`${round.name}${index}`} round={round} textAlign={textAlign} />
                ))}
            </VStack>
        </>
    )
}

export default EventBlock
