import { MaterialIcons } from '@expo/vector-icons'
import { IEventMovement } from '@models/block'
import { movementTransformer } from '@utils/transformer/movement'

import * as Linking from 'expo-linking'
import { Button, Stack, Text, XStack, useTheme } from 'tamagui'

export interface EventBlockMovementProps {
    movement: IEventMovement
    textAlign?: 'center' | 'left'
    hideReps: boolean
}

const EventBlockMovement: React.FC<EventBlockMovementProps> = ({ movement, hideReps, textAlign = 'center' }) => {
    const theme = useTheme()

    const displayMovement = movementTransformer.display(movement, hideReps)

    const handleOnClickUrl = () => {
        if (!movement.videoUrl) return
        Linking.openURL(movement.videoUrl)
    }

    return (
        <Stack>
            {movement.videoUrl ? (
                <XStack ai="center" jc={textAlign === 'center' ? 'center' : 'flex-start'} gap="$2">
                    <Text color="$gray3" fontSize="$5" textAlign={textAlign}>
                        {displayMovement}
                    </Text>
                    <Button size="$1.5" br="$6" w="$1.5" bg="$gray9" onPress={handleOnClickUrl}>
                        <MaterialIcons name="videocam" size={10} color={theme.gray3.val} />
                    </Button>
                </XStack>
            ) : (
                <Text textBreakStrategy="balanced" fontSize="$5" color="$gray3" textAlign={textAlign}>
                    {displayMovement}
                </Text>
            )}
        </Stack>
    )
}

export default EventBlockMovement
