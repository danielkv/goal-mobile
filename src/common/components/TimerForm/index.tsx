import { TextInput } from 'react-native'
import { SvgProps } from 'react-native-svg'

import { Box, HStack, Text, VStack, useTheme } from 'native-base'

import { TTimerType } from '@common/interfaces/timers'
import TimeField from '@components/TimeField'

export interface TabataFormProps {
    type: 'tabata'
    time2: number
    onChangeTime2: (value: number) => void
    rounds: number
    onChangeRounds: (value: number) => void
}

export interface EmomFormProps {
    type: 'emom'
    rounds: number
    onChangeRounds: (value: number) => void
}

export interface RegressiveFormProps {
    type: 'regressive'
}

export interface StopwatchFormProps {
    type: 'stopwatch'
}

type TimerFormProps = {
    Icon: React.FC<SvgProps>
    time1: number
    onChangeTime1: (value: number) => void
} & (TabataFormProps | EmomFormProps | RegressiveFormProps | StopwatchFormProps)

function getTime1Label(type: TTimerType): string {
    switch (type) {
        case 'tabata':
            return 'Work'
        case 'emom':
            return 'A cada'
        default:
            return 'Defina o tempo'
    }
}

const TimerForm: React.FC<TimerFormProps> = (props) => {
    const { colors, fontConfig } = useTheme()

    return (
        <VStack alignItems="center" justifyContent="center" space={5}>
            <Box>
                <props.Icon fill={colors.gray[900]} width={60} />
            </Box>

            <VStack alignItems="center">
                <Text fontSize="sm" fontWeight={400} lineHeight="2xl" color="gray.400">
                    {getTime1Label(props.type)}
                </Text>
                <TimeField value={props.time1} onChange={(value) => props.onChangeTime1(value)} />
            </VStack>

            {props.type === 'tabata' && props.time2 !== undefined && !!props.onChangeTime2 && (
                <VStack alignItems="center">
                    <Text fontSize="sm" fontWeight={400} lineHeight="2xl" color="gray.400">
                        Rest
                    </Text>
                    <TimeField value={props.time2} onChange={(value) => props.onChangeTime2(value)} />
                </VStack>
            )}

            {(props.type === 'tabata' || props.type === 'emom') && (
                <VStack alignItems="center">
                    <Text fontSize="sm" fontWeight={400} lineHeight="2xl" color="gray.400">
                        Rounds
                    </Text>

                    <HStack alignItems="center" bg="gray.800" rounded="md" p={1}>
                        <TextInput
                            keyboardType="number-pad"
                            style={{
                                textAlign: 'center',
                                fontSize: 60,
                                fontFamily: fontConfig.Inter[700].normal,
                                color: colors.gray[200],
                                lineHeight: 70,
                                width: 100,
                            }}
                            maxLength={2}
                            value={String(props.rounds)}
                            onChangeText={(value) => props.onChangeRounds(Number(value))}
                        />
                    </HStack>
                </VStack>
            )}
        </VStack>
    )
}

export default TimerForm
