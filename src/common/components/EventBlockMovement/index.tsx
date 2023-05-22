import { Platform } from 'react-native'

import { Box, HStack, Pressable, Text, useTheme } from 'native-base'

import { FontAwesome5 } from '@expo/vector-icons'

import { IEventMovement } from '@models/block'
import { movementTransformer } from '@utils/transformer/movement'
import * as Linking from 'expo-linking'

export interface EventBlockMovementProps {
    movement: IEventMovement
    textAlign?: 'center' | 'left'
    hideReps: boolean
}

const EventBlockMovement: React.FC<EventBlockMovementProps> = ({ movement, hideReps, textAlign = 'center' }) => {
    const { colors } = useTheme()

    const displayMovement = movementTransformer.display(movement, hideReps)

    const handleOnClickUrl = () => {
        if (!movement.videoUrl) return
        Linking.openURL(movement.videoUrl)
    }

    return (
        <Box>
            {movement.videoUrl ? (
                <Pressable
                    _pressed={Platform.select({
                        ios: {
                            bg: 'gray.700',
                        },
                    })}
                    android_ripple={{ color: colors.gray[700] }}
                    onPress={handleOnClickUrl}
                >
                    <HStack
                        alignItems="center"
                        justifyContent={textAlign === 'center' ? 'center' : 'flex-start'}
                        space={2}
                    >
                        <Text color="gray.300" fontSize="sm" textAlign={textAlign}>
                            {displayMovement}
                        </Text>
                        <FontAwesome5 name="external-link-alt" size={12} color={colors.gray[300]} />
                    </HStack>
                </Pressable>
            ) : (
                <Text textBreakStrategy="balanced" fontSize="sm" color="gray.300" textAlign={textAlign}>
                    {displayMovement}
                </Text>
            )}
        </Box>
    )
}

export default EventBlockMovement
