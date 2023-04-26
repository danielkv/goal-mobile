import { Platform } from 'react-native'

import { Avatar, Box, Heading, Pressable, Text, VStack, useTheme } from 'native-base'

import { FontAwesome5 } from '@expo/vector-icons'

import { IDayModel } from '@models/day'
import { pluralize } from '@utils/strings'
import dayjs from 'dayjs'

export interface WorksheetDayItemProps {
    item: IDayModel

    onPress?: (item: IDayModel) => void
}

const WorksheetDayItem: React.FC<WorksheetDayItemProps> = ({ item, onPress }) => {
    const { colors } = useTheme()

    const date = dayjs(item.date)

    const periodsDisplay = `${item.periods.length} ${pluralize(item.periods.length, 'período')}`

    return (
        <Pressable
            _pressed={Platform.select({
                ios: {
                    bg: 'gray.700',
                },
            })}
            px={5}
            py={4}
            flex={1}
            android_ripple={{ color: colors.gray[700] }}
            backgroundColor={colors.gray[600]}
            borderRadius="md"
            onPress={() => {
                onPress?.(item)
            }}
        >
            <VStack space={0} alignItems="center">
                <Box mb={3}>
                    <FontAwesome5 name="calendar-day" size={24} color={colors.gray[400]} />
                </Box>

                <Heading color="gray.100" fontSize="sm">
                    {date.format('dddd')}
                </Heading>
                <Text color="gray.300" fontSize="2xs">
                    {date.format('DD/MM/YYYY')}
                </Text>
                <Text color="gray.300" fontSize="2xs">
                    {periodsDisplay}
                </Text>
            </VStack>
            {date.isSame(dayjs(), 'date') && (
                <Avatar.Badge position="absolute" top={2} right={2} bg="red.500" borderWidth="0" size={2} />
            )}
        </Pressable>
    )
}

export default WorksheetDayItem
