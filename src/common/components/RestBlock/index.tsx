import { IRestBlock } from '@models/block'
import { getTimeFromSeconds } from '@utils/time'

import { Text } from 'tamagui'

export interface RestBlockProps {
    block: IRestBlock
    textAlign?: 'center' | 'left'
}

const RestBlock: React.FC<RestBlockProps> = ({ block, textAlign }) => {
    return (
        <>
            <Text fontSize="$4" textAlign={textAlign}>{`${getTimeFromSeconds(block.time)} Rest`}</Text>
            {!!block.text && (
                <Text fontSize="$4" color="$gray3" textAlign={textAlign}>
                    {block.text}
                </Text>
            )}
        </>
    )
}

export default RestBlock
