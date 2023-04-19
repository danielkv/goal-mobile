import { Platform } from 'react-native'
import { SvgProps } from 'react-native-svg'

import { Center, IButtonProps, Pressable, Text, useTheme } from 'native-base'

type Props = IButtonProps & {
    description?: string
    Icon: React.FC<SvgProps>
}

export const CardComponent: React.FC<Props> = ({ description, Icon, ...rest }) => {
    const { colors } = useTheme()
    return (
        <Pressable
            flex={1}
            minH={192}
            bg="gray.600"
            _pressed={
                Platform.OS === 'ios'
                    ? {
                          bg: 'gray.700',
                      }
                    : undefined
            }
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
            {/* </Pressable> */}
        </Pressable>
    )
}
