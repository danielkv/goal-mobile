import { Box, HStack, Text, VStack } from 'native-base'

import BlockItem from '../BlockItem'
import { IFlatSection } from '@common/interfaces/worksheet'

export interface SectionItemProps {
    item: IFlatSection
    width: number
}

const SectionItem: React.FC<SectionItemProps> = ({ item, width }) => {
    return (
        <VStack width={width} bg="gray.800" rounded="sm">
            <HStack alignItems="center">
                <Box roundedTopLeft={4} bg="red.500" w="55px" h="55px" alignItems="center" justifyContent="center">
                    <Text color="white" fontWeight="bold" fontSize="lg">
                        {item.period}
                    </Text>
                </Box>

                <Text ml={5} fontSize="sm" fontWeight="bold">
                    {item.name}
                </Text>
            </HStack>

            <VStack my={5} space={4} alignItems="center">
                {item.blocks.map((block, index) => (
                    <Box key={`${block.type}.${index}`} bg="gray.900" w="80%" rounded="md" p={3}>
                        <BlockItem block={block} />
                    </Box>
                ))}
            </VStack>
        </VStack>
    )
}

export default SectionItem
