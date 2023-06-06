import { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import { SvgProps } from 'react-native-svg'

import { useOrientation } from '@common/hooks/useOrientation'
import { TActivityStatus, TTimerStatus } from '@common/interfaces/timers'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { useKeepAwake } from 'expo-keep-awake'
import * as ScreenOrientation from 'expo-screen-orientation'
import { Stack, Text, XStack, YStack, useTheme } from 'tamagui'

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
    const orientation = useOrientation()
    const isPortrait = orientation === 'portrait'
    const theme = useTheme()

    const navigation = useNavigation()

    useKeepAwake()

    useEffect(() => {
        ScreenOrientation.unlockAsync()

        return () => {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
        }
    }, [])

    useEffect(() => {
        navigation.setOptions({ headerStyle: { backgroundColor: isPortrait ? theme.gray9.val : theme.gray7.val } })
    }, [isPortrait])

    if (watchProgressStatus === 'initial')
        return (
            <Stack flex={1} alignItems="center" justifyContent="center">
                <TouchableOpacity onPress={onPressPlayButton}>
                    <MaterialIcons name="play-circle-filled" color={theme.red5.val} size={100} />
                </TouchableOpacity>
            </Stack>
        )

    return (
        <YStack flex={1} alignItems="center" justifyContent="center" gap="$4">
            {activityStatus !== undefined && (
                <Stack bg={activityStatus === 'work' ? '$red5' : '$gray9'} mb="$4" px="$2" py="$1" br="$4">
                    <Text fontSize="$5" fontWeight="700">
                        {activityStatus.toLocaleUpperCase()}
                    </Text>
                </Stack>
            )}

            <Stack gap={isPortrait ? '$4' : '$8'} flexDirection={isPortrait ? 'column' : 'row'} alignItems="center">
                <Stack flexDirection={isPortrait ? 'column' : 'row'} alignItems="center" gap={isPortrait ? '$4' : '$3'}>
                    <Stack>
                        <Icon fill={theme.gray5.val} width={isPortrait ? 60 : 48} />
                    </Stack>

                    {initialCountdown ? (
                        <Text color={theme.red2.val} fontWeight="700" fontSize={isPortrait ? '$14' : '$15'}>
                            {initialCountdown}
                        </Text>
                    ) : (
                        <Text color={theme.gray2.val} fontWeight="700" fontSize={isPortrait ? '$13' : '$14'}>
                            {time}
                        </Text>
                    )}
                </Stack>

                {initialCountdown === undefined && round !== undefined && (
                    <Stack flexDirection={isPortrait ? 'column' : 'row'} alignItems="center" gap="$3">
                        <Text fontSize="$5" fontWeight="400" color="$gray4">
                            Round
                        </Text>

                        <Text fontSize="$8" fontWeight="700" color="$gray2">
                            {round}
                        </Text>
                    </Stack>
                )}
            </Stack>

            {initialCountdown === undefined && (
                <XStack mt={isPortrait ? 10 : 0} alignItems="center" gap="$5">
                    {watchProgressStatus === 'running' ? (
                        <>
                            <TouchableOpacity onPress={onPressPauseButton}>
                                <MaterialIcons
                                    name="pause-circle-filled"
                                    color={theme.gray5.val}
                                    size={isPortrait ? 75 : 65}
                                />
                            </TouchableOpacity>
                        </>
                    ) : (
                        <>
                            {watchProgressStatus !== 'finished' && (
                                <TouchableOpacity onPress={onPressPlayButton}>
                                    <MaterialIcons
                                        name="play-circle-filled"
                                        color={theme.red5.val}
                                        size={isPortrait ? 75 : 65}
                                    />
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity onPress={onPressResetButton}>
                                <MaterialIcons
                                    name="replay-circle-filled"
                                    color={theme.gray5.val}
                                    size={isPortrait ? 75 : 65}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onPressEditButton}>
                                <MaterialIcons name="edit" color={theme.gray5.val} size={isPortrait ? 50 : 40} />
                            </TouchableOpacity>
                        </>
                    )}
                </XStack>
            )}
        </YStack>
    )
}

export default TimerDisplay
