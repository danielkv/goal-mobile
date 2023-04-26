import React from 'react'

import { Box, Text } from 'native-base'

import { ITextBlock } from '@models/block'

export interface TextBlockProps {
    block: ITextBlock
}

const TextBlock: React.FC<TextBlockProps> = ({ block }) => {
    return (
        <Box alignItems="center">
            <Text>{block.text}</Text>
        </Box>
    )
}

export default TextBlock
