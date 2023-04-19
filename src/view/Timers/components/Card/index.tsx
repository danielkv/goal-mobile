import { SvgProps } from 'react-native-svg'

import { Button, Center, IButtonProps, Text } from 'native-base'

type Props = IButtonProps & {
    description?: string
    Icon: React.FC<SvgProps>
}

export const CardComponent: React.FC<Props> = ({ description, Icon, ...rest }) => {
    return (
        <Button
            minH={192}
            minW={153}
            bg={'gray.600'}
            _pressed={{
                bg: 'red.500',
            }}
            {...rest}
        >
            <Center>
                <Icon />

                <Text mt={22} fontSize={'xs'} color={'gray.200'} fontWeight={'medium'} lineHeight={'sm'}>
                    {description}
                </Text>
            </Center>
        </Button>
    )
}
