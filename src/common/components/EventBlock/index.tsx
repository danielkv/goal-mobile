import { Text, VStack } from 'native-base'

import EventBlockRound from '@components/EventBlockRound'
import { IEventBlock } from '@models/block'
import { eventBlockTransformer } from '@utils/transformer/eventblock'

export interface PeriodEventBlock {
    block: IEventBlock
    textAlign?: 'center' | 'left'
}

const EventBlock: React.FC<PeriodEventBlock> = ({ block, textAlign = 'center' }) => {
    const blockTitle = eventBlockTransformer.displayTitle(block)

    return (
        <>
            {!!block.name && (
                <Text fontSize="xs" textAlign={textAlign}>
                    {block.name}
                </Text>
            )}
            {!!blockTitle &&
                (textAlign === 'center' ? (
                    <Text bg={'gray.900'} px={5} py={1} mb={1} fontSize="sm" textAlign={textAlign}>
                        {blockTitle}
                    </Text>
                ) : (
                    <Text fontWeight="bold" fontSize="md" ml={1} mb={1} textAlign={textAlign}>
                        {blockTitle}
                    </Text>
                ))}
            <VStack space={2}>
                {block.rounds.map((round, index) => (
                    <EventBlockRound key={`${round.type}${index}`} round={round} textAlign={textAlign} />
                ))}
            </VStack>
        </>
    )
}

export default EventBlock
