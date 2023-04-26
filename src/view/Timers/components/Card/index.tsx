import { Platform } from 'react-native'
import { SvgProps } from 'react-native-svg'

import { Center, IButtonProps, Pressable, Text, useTheme } from 'native-base'

interface TimerCardProps extends IButtonProps {
    title?: string
    Icon: React.FC<SvgProps>
}

const TimerCard: React.FC<TimerCardProps> = ({ title: description, Icon, ...rest }) => {
    const { colors } = useTheme()
    return (
        <Pressable
            flex={1}
            minH={192}
            bg="gray.600"
            _pressed={Platform.select({
                ios: {
                    bg: 'gray.700',
                },
            })}
            android_ripple={{ color: colors.gray[700] }}
            alignItems="center"
            justifyContent="center"
            rounded="md"
            {...rest}
        >
            <Center>
                <Icon />

                <Text mt={22} fontSize={'xs'} color={'gray.200'} fontWeight={'medium'} lineHeight={'sm'}>
                    {description}
                </Text>
            </Center>
        </Pressable>
    )
}

export default TimerCard
