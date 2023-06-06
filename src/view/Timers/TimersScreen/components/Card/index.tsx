import { PressableProps } from 'react-native'
import { SvgProps } from 'react-native-svg'

import Pressable from '@components/Pressable'

import { Stack, Text } from 'tamagui'

interface TimerCardProps {
    onPress: PressableProps['onPress']
    title?: string
    Icon: React.FC<SvgProps>
}

const TimerCard: React.FC<TimerCardProps> = ({ title: description, Icon, ...rest }) => {
    return (
        <Stack flex={1} ac="center" jc="center">
            <Pressable br="$4" py="$7" bg="$gray6" effectColor="$gray7" ac="center" ai="center" {...rest}>
                <Icon fill="white" />

                <Text mt="$5" fontSize="$3" color="$gray2" fontWeight="600">
                    {description}
                </Text>
            </Pressable>
        </Stack>
    )
}

export default TimerCard
