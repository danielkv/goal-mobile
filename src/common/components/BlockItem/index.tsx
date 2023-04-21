import EventBlock from '../EventBlock'
import RestBlock from '@components/RestBlock'
import TextBlock from '@components/TextBlock'
import { IBlock } from '@models/block'

export interface BlockProps {
    block: IBlock
    textAlign?: 'center' | 'left'
}

const BlockItem: React.FC<BlockProps> = ({ block, textAlign = 'center' }) => {
    switch (block.type) {
        case 'event':
            return <EventBlock block={block} textAlign={textAlign} />
        case 'rest':
            return <RestBlock block={block} textAlign={textAlign} />
        case 'text':
            return <TextBlock block={block} textAlign={textAlign} />
    }

    return null
}

export default BlockItem
