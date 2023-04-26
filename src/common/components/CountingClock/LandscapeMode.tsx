import { Box, Center, HStack, Pressable, Text, VStack, useTheme } from 'native-base'

import { CountingClockProps } from '.'
import ClockEditButtonIcon from '@assets/svg/clock-edit-button.svg'
import ResetTimeButtonIcon from '@assets/svg/reset-time-button.svg'
import TimePauseButtonIcon from '@assets/svg/time-pause-button.svg'
import WatchStartButtonIcon from '@assets/svg/watch-start-button.svg'

const LandscapeMode = ({
    time,
    Icon,
    numberRounds,
    onPressWatchStartButton,
    onPressClockEditButton,
    onPressTimePauseButton,
    onPressResetTimeButton,
    hasRound,
    isTabata,
    weatherActivityStatus,
    watchProgressStatus,
}: CountingClockProps) => {
    const { colors } = useTheme()

    return (
        <Center>
            <HStack>
                <HStack>
                    <VStack>
                        <HStack justifyContent={'flex-end'}>
                            {isTabata &&
                                (weatherActivityStatus === 'work' ? (
                                    <Box
                                        bg={'red.500'}
                                        mt={'20'}
                                        padding={'2'}
                                        rounded={4}
                                        alignContent={'center'}
                                        justifyContent={'center'}
                                        _text={{
                                            fontSize: 'lg',
                                            fontWeight: 700,
                                            lineHeight: 'lg',
                                        }}
                                    >
                                        WORK
                                    </Box>
                                ) : (
                                    <Box
                                        bg={'gray.900'}
                                        mt={'20'}
                                        padding={'2'}
                                        rounded={4}
                                        alignContent={'center'}
                                        justifyContent={'center'}
                                        _text={{
                                            fontSize: 'lg',
                                            fontWeight: 700,
                                            lineHeight: 'lg',
                                        }}
                                    >
                                        REST
                                    </Box>
                                ))}
                        </HStack>
                        <HStack alignItems={'center'} mt={isTabata ? '0' : '24'}>
                            <Icon fill={colors.gray[900]} width={48} height={57} />
                            <Text
                                color={colors.gray[200]}
                                fontWeight={700}
                                fontSize={'7xl'}
                                lineHeight={'7xl'}
                                ml={'5'}
                            >
                                {time}
                            </Text>
                        </HStack>
                    </VStack>
                </HStack>

                {hasRound && (
                    <HStack justifyContent={'flex-end'} alignItems={'flex-end'} alignContent={'flex-end'}>
                        <HStack alignItems={'center'} ml={'24'}>
                            <Text fontSize={'md'} fontWeight={400} lineHeight={'7xl'} color={'gray.400'} mr={'4'}>
                                {numberRounds! > 1 ? 'Rounds' : 'Round'}
                            </Text>

                            <Text fontSize={'6xl'} fontWeight={700} lineHeight={'6xl'} color={'gray.200'}>
                                {numberRounds}
                            </Text>
                        </HStack>
                    </HStack>
                )}
            </HStack>
            <HStack alignItems={'center'} mt={'10'} pr={hasRound ? '24' : '0'}>
                {watchProgressStatus === 'running' ? (
                    <HStack>
                        <Pressable onPress={onPressTimePauseButton}>
                            <TimePauseButtonIcon width={68} height={68} />
                        </Pressable>
                        <Pressable onPress={onPressResetTimeButton} ml={'8'}>
                            <ResetTimeButtonIcon width={54} height={65} />
                        </Pressable>
                    </HStack>
                ) : (
                    <HStack alignItems={'center'}>
                        <Pressable onPress={onPressWatchStartButton}>
                            <WatchStartButtonIcon fill={colors.primary[500]} />
                        </Pressable>

                        <Pressable onPress={onPressClockEditButton} ml={'8'}>
                            <ClockEditButtonIcon />
                        </Pressable>
                    </HStack>
                )}
            </HStack>
        </Center>
    )
}

export default LandscapeMode
