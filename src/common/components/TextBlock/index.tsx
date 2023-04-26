import React from 'react'

import { Text } from 'native-base'

import { ITextBlock } from '@models/block'

export interface TextBlockProps {
    block: ITextBlock
    textAlign?: 'center' | 'left'
}

const TextBlock: React.FC<TextBlockProps> = ({ block, textAlign = 'center' }) => {
    return (
        <>
            <Text textAlign={textAlign}>{block.text}</Text>
        </>
    )
}

export default TextBlock
