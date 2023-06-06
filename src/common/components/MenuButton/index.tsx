import Pressable from '@components/Pressable'

import { Text } from 'tamagui'

export interface MenuButtonProps {
    Icon: React.ElementType<any>
    label: string
    onPress?(): void
}

const MenuButton: React.FC<MenuButtonProps> = ({ Icon, label, onPress }) => {
    return (
        <Pressable f={1} px="$4" ai="center" jc="center" onPress={onPress} effectColor="$gray7">
            <Icon />
            <Text fontSize={10} color="$gray5">
                {label}
            </Text>
        </Pressable>
    )
}

export default MenuButton
