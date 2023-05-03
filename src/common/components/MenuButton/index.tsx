import { Platform } from 'react-native'

import { Pressable, Text, useTheme } from 'native-base'

export interface MenuButtonProps {
    Icon: React.ElementType<any>
    label: string
    onPress?(): void
}

const MenuButton: React.FC<MenuButtonProps> = ({ Icon, label, onPress }) => {
    const { colors } = useTheme()

    return (
        <Pressable
            _pressed={Platform.select({
                ios: {
                    bg: 'gray.700',
                },
            })}
            android_ripple={{ color: colors.gray[800] }}
            alignItems="center"
            onPress={onPress}
            py={3}
            px={6}
        >
            <Icon />
            <Text fontSize={10} color="gray.500">
                {label}
            </Text>
        </Pressable>
    )
}

export default MenuButton
