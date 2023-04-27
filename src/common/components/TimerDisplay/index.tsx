import { useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import { SvgProps } from 'react-native-svg'

import { Box, Flex, HStack, Pressable, Text, useTheme } from 'native-base'

import { MaterialIcons } from '@expo/vector-icons'

import { TActivityStatus, TTimerStatus } from '@common/interfaces/timers'
import { useNavigation } from '@react-navigation/native'

export interface TimerDisplayProps {
    time: string
    Icon: React.FC<SvgProps>
    round?: number
    activityStatus?: TActivityStatus
    watchProgressStatus: TTimerStatus
    initialCountdown?: string
    onPressPlayButton: () => void
    onPressEditButton: () => void
    onPressPauseButton: () => void
    onPressResetButton: () => void
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({
    time,
    Icon,
    round,
    activityStatus,
    watchProgressStatus,
    initialCountdown,
    onPressPlayButton,
    onPressEditButton,
    onPressPauseButton,
    onPressResetButton,
}) => {
    const { width, height } = useWindowDimensions()
    const isPortrait = height > width
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({ headerStyle: { backgroundColor: isPortrait ? colors.gray[900] : colors.gray[700] } })
    }, [isPortrait])

    const { colors, sizes } = useTheme()

    if (watchProgressStatus === 'initial')
        return (
            <Pressable onPress={onPressPlayButton}>
                {({ isPressed }) => (
                    <MaterialIcons
                        name="play-circle-filled"
                        color={isPressed ? colors.red[600] : colors.red[500]}
                        size={100}
                    />
                )}
            </Pressable>
        )

    return (
        <Box flex={1} alignItems="center" justifyContent="center">
            {activityStatus !== undefined && (
                <Box
                    bg={activityStatus === 'work' ? 'red.500' : 'gray.900'}
                    mb={5}
                    px={2}
                    py={1}
                    rounded={4}
                    _text={{
                        fontSize: 'md',
                        fontWeight: 700,
                    }}
                >
                    {activityStatus.toLocaleUpperCase()}
                </Box>
            )}

            <Flex
                style={{ gap: isPortrait ? sizes[3] : sizes[10] }}
                direction={isPortrait ? 'column' : 'row'}
                alignItems="center"
            >
                <Flex direction={isPortrait ? 'column' : 'row'} alignItems="center" style={{ gap: sizes[3] }}>
                    <Box>
                        <Icon fill={colors.gray[900]} width={isPortrait ? 60 : 48} />
                    </Box>

                    <Text
                        color={colors.gray[200]}
                        fontWeight={700}
                        fontSize={initialCountdown !== undefined ? '8xl' : '5xl'}
                        lineHeight={initialCountdown !== undefined ? '9xl' : '6xl'}
                    >
                        {initialCountdown || time}
                    </Text>
                </Flex>

                {initialCountdown === undefined && round !== undefined && (
                    <Flex direction={isPortrait ? 'column' : 'row'} alignItems="center" style={{ gap: sizes[3] }}>
                        <Text fontSize="md" fontWeight={400} lineHeight="2xl" color="gray.400">
                            Round
                        </Text>

                        <Text fontSize="6xl" fontWeight={700} lineHeight="6xl" color="gray.200">
                            {round}
                        </Text>
                    </Flex>
                )}
            </Flex>

            {initialCountdown === undefined && (
                <HStack mt={isPortrait ? 10 : 0} alignItems={'center'} space={5}>
                    {watchProgressStatus === 'running' ? (
                        <>
                            <Pressable onPress={onPressPauseButton}>
                                {({ isPressed }) => (
                                    <MaterialIcons
                                        name="pause-circle-filled"
                                        color={isPressed ? 'black' : colors.gray[900]}
                                        size={isPortrait ? 75 : 65}
                                    />
                                )}
                            </Pressable>
                        </>
                    ) : (
                        <>
                            {watchProgressStatus !== 'finished' && (
                                <Pressable onPress={onPressPlayButton}>
                                    {({ isPressed }) => (
                                        <MaterialIcons
                                            name="play-circle-filled"
                                            color={isPressed ? colors.red[600] : colors.red[500]}
                                            size={isPortrait ? 75 : 65}
                                        />
                                    )}
                                </Pressable>
                            )}
                            <Pressable onPress={onPressResetButton}>
                                {({ isPressed }) => (
                                    <MaterialIcons
                                        name="replay-circle-filled"
                                        color={isPressed ? 'black' : colors.gray[900]}
                                        size={isPortrait ? 75 : 65}
                                    />
                                )}
                            </Pressable>
                            <Pressable onPress={onPressEditButton}>
                                {({ isPressed }) => (
                                    <MaterialIcons
                                        name="edit"
                                        color={isPressed ? 'black' : colors.gray[900]}
                                        size={isPortrait ? 50 : 40}
                                    />
                                )}
                            </Pressable>
                        </>
                    )}
                </HStack>
            )}
        </Box>
    )
}

export default TimerDisplay
