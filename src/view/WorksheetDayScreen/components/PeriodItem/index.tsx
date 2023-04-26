import { Platform } from 'react-native'

import { Box, HStack, Pressable, Text, VStack, useTheme } from 'native-base'

import EventBlock from '../EventBlock'
import RestBlock from '../RestBlock'
import TextBlock from '../TextBlock'
import { Period } from '@models/day'
import dayjs from 'dayjs'

export interface WorksheetDayItemProps {
    item: Period
    date: string
    worksheetId: string
    dayId: string
    periodNumber: number
    onGroupPress?: (worksheetId: string, dayId: string, groupIndex: number) => void
}

const PeriodItem: React.FC<WorksheetDayItemProps> = ({
    item,
    onGroupPress,
    date,
    periodNumber,
    dayId,
    worksheetId,
}) => {
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
                        _pressed={
                            Platform.OS === 'ios'
                                ? {
                                      bg: 'gray.700',
                                  }
                                : undefined
                        }
                        android_ripple={{ color: colors.gray[700] }}
                        onPress={() => onGroupPress?.(worksheetId, dayId, index)}
                    >
                        <VStack p={3} alignItems="center" key={group.name} maxW="80%">
                            <Box bg="amber.100">
                                <Text textAlign="center" bg="red.500" px={7} py={3} fontSize="md" fontWeight="bold">
                                    {group.name}
                                </Text>
                            </Box>
                            <VStack mt={5} space={5}>
                                {group.blocks.map((block) => {
                                    switch (block.type) {
                                        case 'event':
                                            return <EventBlock block={block} />
                                        case 'rest':
                                            return <RestBlock block={block} />
                                        case 'text':
                                            return <TextBlock block={block} />
                                    }
                                })}
                            </VStack>
                        </VStack>
                    </Pressable>
                ))}
            </VStack>
        </Box>
    )
}

export default PeriodItem
