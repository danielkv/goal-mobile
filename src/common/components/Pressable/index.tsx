import { Platform, PressableProps, Pressable as RNPressable } from 'react-native'

import { ColorTokens, Stack, useTheme } from 'tamagui'

export interface IPressableProps {
    onPress: PressableProps['onPress']
    effectColor?: ColorTokens
}

const Pressable = Stack.styleable<IPressableProps>(({ onPress, effectColor, ...props }, ref) => {
    const theme = useTheme()

    const color = effectColor ? (theme[effectColor as keyof typeof theme]?.val as string) || null : null
    const isIos = Platform.OS === 'ios'

    return (
        <RNPressable onPress={onPress} android_ripple={color ? { color } : undefined}>
            {({ pressed }) => (
                <Stack ref={ref} {...props} bg={isIos && pressed ? color : props.bg || props.backgroundColor}>
                    {props.children}
                </Stack>
            )}
        </RNPressable>
    )
})

export default Pressable
