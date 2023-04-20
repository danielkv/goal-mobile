import React from 'react'

import { Box, Text } from 'native-base'

import { IRestBlock } from '@models/block'
import { getTimeFromSeconds } from '@utils/time'

export interface RestBlockProps {
    block: IRestBlock
}

const RestBlock: React.FC<RestBlockProps> = ({ block }) => {
    return (
        <Box alignItems="center">
            <Text fontSize="sm">{`${getTimeFromSeconds(block.time)} Rest`}</Text>
            {!!block.text && <Text fontSize="sm" color="gray.300">{` - ${block.text}`}</Text>}
        </Box>
    )
}

export default RestBlock
