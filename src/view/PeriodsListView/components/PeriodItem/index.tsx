import { Box, HStack, Text, VStack } from 'native-base'

import BlockItem from '@components/BlockItem'
import { IPeriod } from '@models/day'
import dayjs from 'dayjs'

export interface WorksheetDayItemProps {
    item: IPeriod
    date: string
    periodNumber: number
    indexSum: number
    onSectionPress?: (sectionIndex: number) => void
}

const PeriodItem: React.FC<WorksheetDayItemProps> = ({ item, onSectionPress, date, periodNumber }) => {
    const dateJs = dayjs(date)

    return (
        <Box flex={1} bg="gray.800" borderRadius="md">
            <HStack alignItems="center" justifyContent="space-between">
                <Box roundedTopLeft={4} bg="red.500" w="55px" h="55px" alignItems="center" justifyContent="center">
                    <Text color="white" fontWeight="bold" fontSize="lg">
                        {periodNumber}
                    </Text>
                </Box>

                <Text mr={5} fontSize="xs">
                    {dateJs.format('ddd[.] DD/MM/YYYY')}
                </Text>
            </HStack>
            <VStack alignItems="center" space={4}>
                {item.sections.map((group, index) => (
                    <VStack key={`${group.name}.${index}`} alignItems="center" mx={2} my={5}>
                        <Box>
                            <Text textAlign="center" bg="red.500" px={7} py={3} fontSize="md" fontWeight="bold">
                                {group.name}
                            </Text>
                        </Box>
                        <VStack space={1} mt={3}>
                            {group.blocks.map((block, index) => (
                                <BlockItem key={`${block.type}.${index}`} block={block} textAlign="center" />
                            ))}
                        </VStack>
                    </VStack>
                ))}
            </VStack>
        </Box>
    )
}

export default PeriodItem
