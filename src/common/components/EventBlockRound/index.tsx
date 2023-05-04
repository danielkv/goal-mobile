import { Text, VStack } from 'native-base'

import EventBlockMovement from '@components/EventBlockMovement'
import { IEventRound } from '@models/block'
import { numberHelper } from '@utils/numbers'

export interface EventBlockRoundProps {
    round: IEventRound
    textAlign?: 'center' | 'left'
}

const EventBlockRound: React.FC<EventBlockRoundProps> = ({ round, textAlign = 'center' }) => {
    return (
        <>
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
            <VStack>
                {round.movements.map((movement, index) => (
                    <EventBlockMovement key={`${movement.name}.${index}`} movement={movement} textAlign={textAlign} />
                ))}
            </VStack>
        </>
    )
}

export default EventBlockRound
