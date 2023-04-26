import { Box, Center, HStack, Pressable, Text, useTheme } from 'native-base'

import { CountingClockProps } from '.'
import ClockEditButtonIcon from '@assets/svg/clock-edit-button.svg'
import ResetTimeButtonIcon from '@assets/svg/reset-time-button.svg'
import TimePauseButtonIcon from '@assets/svg/time-pause-button.svg'
import WatchStartButtonIcon from '@assets/svg/watch-start-button.svg'

const PortraitMode = ({
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
        <Center alignItems={'center'} justifyContent={'center'}>
            {isTabata &&
                (weatherActivityStatus === 'work' ? (
                    <Box
                        bg={'red.500'}
                        mt={50}
                        mb={5}
                        padding={'2'}
                        rounded={4}
                        _text={{
                            fontSize: 'lg',
                            fontWeight: 700,
                        }}
                    >
                        WORK
                    </Box>
                ) : (
                    <Box
                        bg={'gray.900'}
                        mt={50}
                        mb={5}
                        padding={'2'}
                        rounded={4}
                        _text={{
                            fontSize: 'lg',
                            fontWeight: 700,
                        }}
                    >
                        REST
                    </Box>
                ))}

            <Center mt={isTabata ? '8' : '32'}>
                <Icon fill={colors.gray[900]} width={48} height={57} />

                <Text color={colors.gray[200]} fontWeight={700} fontSize={'5xl'} lineHeight={'6xl'} mt={'7'}>
                    {time}
                </Text>
            </Center>

            {hasRound && (
                <>
                    <Text mt={36} fontSize={'md'} fontWeight={400} lineHeight={'2xl'} color={'gray.400'}>
                        {numberRounds! > 1 ? 'Rounds' : 'Round'}
                    </Text>

                    <Text mt={36} fontSize={'6xl'} fontWeight={700} lineHeight={'7xl'} color={'gray.200'}>
                        {numberRounds}
                    </Text>
                </>
            )}

            <HStack mt={'20'} alignItems={'center'}>
                {watchProgressStatus === 'running' ? (
                    <>
                        <Pressable onPress={onPressTimePauseButton}>
                            <TimePauseButtonIcon />
                        </Pressable>
                        <Pressable onPress={onPressResetTimeButton} ml={'5'}>
                            <ResetTimeButtonIcon />
                        </Pressable>
                    </>
                ) : (
                    <>
                        <Pressable onPress={onPressWatchStartButton}>
                            <WatchStartButtonIcon fill={colors.primary[500]} />
                        </Pressable>

                        <Pressable onPress={onPressClockEditButton} ml={'5'}>
                            <ClockEditButtonIcon />
                        </Pressable>
                    </>
                )}
            </HStack>
        </Center>
    )
}

export default PortraitMode
