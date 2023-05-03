import { Platform } from 'react-native'

import { HStack, Pressable, Text, useTheme } from 'native-base'

import { FontAwesome5 } from '@expo/vector-icons'

import { IEventMovement } from '@models/block'
import { numberHelper } from '@utils/numbers'
import { displayWeight } from '@utils/worksheet'
import * as Linking from 'expo-linking'

export interface EventBlockMovementProps {
    movement: IEventMovement
    textAlign?: 'center' | 'left'
}

const EventBlockMovement: React.FC<EventBlockMovementProps> = ({ movement, textAlign = 'center' }) => {
    const { colors } = useTheme()
    const weight = displayWeight(movement.weight)
    const reps = numberHelper.convertNumbers(movement.reps, { suffix: '' })
    const repsDisplay = reps && reps !== '0' ? `${reps} ` : ''
    const displayMovement = `${repsDisplay}${movement.name}${weight}`

    const handleOnClickUrl = () => {
        if (!movement.videoUrl) return
        Linking.openURL(movement.videoUrl)
    }

    return (
        <>
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
                        <Text color="gray.300" fontSize="xs" textAlign={textAlign}>
                            {displayMovement}
                        </Text>
                        <FontAwesome5 name="external-link-alt" size={12} color={colors.gray[300]} />
                    </HStack>
                </Pressable>
            ) : (
                <Text fontSize="xs" color="gray.300" textAlign={textAlign}>
                    {displayMovement}
                </Text>
            )}
        </>
    )
}

export default EventBlockMovement
