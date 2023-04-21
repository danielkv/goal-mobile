import { Platform } from 'react-native'

import { Box, HStack, Pressable, Text, VStack, useTheme } from 'native-base'

import BlockItem from '@components/BlockItem'
import { Period } from '@models/day'
import dayjs from 'dayjs'

export interface WorksheetDayItemProps {
    item: Period
    date: string
    periodNumber: number
    indexSum: number
    onSectionPress?: (sectionIndex: number) => void
}

const PeriodItem: React.FC<WorksheetDayItemProps> = ({ item, onSectionPress, date, periodNumber, indexSum }) => {
    const { colors } = useTheme()
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
                {item.groups.map((group, index) => (
                    <Pressable
                        key={`${group.name}.${index}`}
                        _pressed={Platform.select({
                            ios: {
                                bg: 'gray.700',
                            },
                        })}
                        android_ripple={{ color: colors.gray[700] }}
                        onPress={() => onSectionPress?.(indexSum + index)}
                    >
                        <VStack p={3} alignItems="center" key={group.name} maxW="80%">
                            <Box bg="amber.100">
                                <Text textAlign="center" bg="red.500" px={7} py={3} fontSize="md" fontWeight="bold">
                                    {group.name}
                                </Text>
                            </Box>
                            <VStack mt={5} space={5}>
                                {group.blocks.map((block, index) => (
                                    <BlockItem key={`${block.type}.${index}`} block={block} textAlign="center" />
                                ))}
                            </VStack>
                        </VStack>
                    </Pressable>
                ))}
            </VStack>
        </Box>
    )
}

export default PeriodItem
