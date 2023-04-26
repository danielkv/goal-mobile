import { Box, HStack, Text, VStack } from 'native-base'

import { IFlatSection } from '@common/interfaces/worksheet'
import BlockItem from '@components/BlockItem'

export interface SectionItemProps {
    item: IFlatSection
    width: number
}

const SectionItem: React.FC<SectionItemProps> = ({ item, width }) => {
    const sectionNumber = `${item.period}.${item.sectionNumber}`
    return (
        <VStack width={width} bg="gray.800" rounded="sm">
            <HStack alignItems="center">
                <Box roundedTopLeft={4} bg="red.500" w="55px" h="55px" alignItems="center" justifyContent="center">
                    <Text color="white" fontWeight="bold" fontSize="lg">
                        {sectionNumber}
                    </Text>
                </Box>

                <Text ml={5} fontSize="sm" fontWeight="bold">
                    {item.name}
                </Text>
            </HStack>

            <VStack my={5} space={4} alignItems="center">
                {item.blocks.map((block, index) => (
                    <Box key={`${block.type}.${index}`} bg="gray.900" w="80%" rounded="md" p={3}>
                        <Box mb={4}>
                            <BlockItem block={block} textAlign="left" />
                        </Box>
                        <Box px={2} roundedTop="sm" bg="gray.500" position="absolute" bottom={0} right={3}>
                            <Text fontSize="2xs">{`${sectionNumber}.${index + 1}`}</Text>
                        </Box>
                    </Box>
                ))}
            </VStack>
        </VStack>
    )
}

export default SectionItem
