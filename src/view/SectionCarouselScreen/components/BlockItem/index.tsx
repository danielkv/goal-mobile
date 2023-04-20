import EventBlock from '../EventBlock'
import RestBlock from '../RestBlock'
import TextBlock from '../TextBlock'
import { IBlock } from '@models/block'

export interface BlockProps {
    block: IBlock
}

const BlockItem: React.FC<BlockProps> = ({ block }) => {
    switch (block.type) {
        case 'event':
            return <EventBlock block={block} />
        case 'rest':
            return <RestBlock block={block} />
        case 'text':
            return <TextBlock block={block} />
    }

    return null
}

export default BlockItem
