import React from 'react'

import { Avatar, HStack, Heading, Pressable, Text, VStack, useTheme } from 'native-base'

import { FontAwesome5 } from '@expo/vector-icons'

import { Worksheet } from '@models/day'
import dayjs from 'dayjs'

export interface WorksheetDayItemProps {
    item: Worksheet
    current?: boolean
    onClick?: (item: Worksheet) => void
}

const WorksheetDayItem: React.FC<WorksheetDayItemProps> = ({ item, current }) => {
    const { colors } = useTheme()

    return (
        <Pressable
            px={5}
            py={4}
            android_ripple={{ color: colors.gray[700] }}
            backgroundColor={colors.gray[600]}
            borderRadius="md"
        >
            <HStack space={5} alignItems="center">
                <FontAwesome5 name="clipboard-list" size={24} color={colors.gray[400]} />
                <VStack>
                    <Heading color="gray.100" fontSize="md">
                        {item.name}
                    </Heading>
                    <Text color="gray.300" fontSize="2xs">
                        {dayjs(item.startDate).format('DD/MM/YYYY')}
                    </Text>
                </VStack>
            </HStack>
            {current && <Avatar.Badge position="absolute" top={2} right={2} bg="red.500" borderWidth="0" size={2} />}
        </Pressable>
    )
}

export default WorksheetDayItem
