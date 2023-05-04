import { Text } from 'native-base'

import { IRestBlock } from '@models/block'
import { getTimeFromSeconds } from '@utils/time'

export interface RestBlockProps {
    block: IRestBlock
    textAlign?: 'center' | 'left'
}

const RestBlock: React.FC<RestBlockProps> = ({ block, textAlign }) => {
    return (
        <>
            <Text fontSize="sm" textAlign={textAlign}>{`${getTimeFromSeconds(block.time)} Rest`}</Text>
            {!!block.text && (
                <Text fontSize="sm" color="gray.300" textAlign={textAlign}>
                    {block.text}
                </Text>
            )}
        </>
    )
}

export default RestBlock
