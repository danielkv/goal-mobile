import { useCallback, useRef, useState } from 'react'
import { TextInput } from 'react-native'
import { SvgProps } from 'react-native-svg'

import { AlertDialog, Box, Button, HStack, Pressable, Text, VStack, useTheme } from 'native-base'

import { MaterialIcons } from '@expo/vector-icons'

import { TTimerType } from '@common/interfaces/timers'
import TextField from '@components/TextField'
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
    countdown: number
    onChangeCountdown: (value: number) => void
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
    const [contdownDialogOpen, setupCountdownDialogOpen] = useState(false)

    const cancelRef = useRef(null)

    const handleClose = useCallback(() => {
        setupCountdownDialogOpen(false)
    }, [])

    return (
        <VStack flex={1} alignItems="center" justifyContent="center" space={5}>
            <Box>
                <props.Icon fill={colors.gray[900]} width={60} />
            </Box>
            <HStack>
                <Text mr={3} fontSize="sm" fontWeight={400} lineHeight="2xl" color="gray.400">
                    {props.countdown > 0 ? `Countdown ${props.countdown}s` : 'Sem countdown'}
                </Text>
                <Pressable onPress={() => setupCountdownDialogOpen(true)}>
                    {({ isPressed }) => (
                        <MaterialIcons name="edit" color={isPressed ? 'black' : colors.gray[900]} size={24} />
                    )}
                </Pressable>
            </HStack>
            <VStack alignItems="center">
                <Text fontSize="sm" fontWeight={400} lineHeight="2xl" color="gray.400">
                    {getTime1Label(props.type)}
                </Text>
                <TimeField value={props.time1} onChange={(value) => props.onChangeTime1(value)} />
                {props.type === 'stopwatch' && (
                    <Text fontSize="xs" color="gray.500">
                        00:00 para indeterminado
                    </Text>
                )}
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
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={contdownDialogOpen} onClose={handleClose}>
                <AlertDialog.Content bg="gray.600">
                    <AlertDialog.Header bg="gray.600" borderColor="gray.900">
                        <Text color="gray.100">Alterar countdown</Text>
                    </AlertDialog.Header>
                    <AlertDialog.Body bg="gray.600">
                        <TextField
                            label="Countdown"
                            keyboardType="numeric"
                            value={String(props.countdown)}
                            onChangeText={(value) => props.onChangeCountdown(Number(value))}
                        />
                        <Text fontSize="xs" color="gray.300">
                            0 sem countdown
                        </Text>
                    </AlertDialog.Body>
                    <AlertDialog.Footer bg="gray.600" borderColor="gray.900">
                        <Button.Group space={2}>
                            <Button colorScheme="red" onPress={handleClose}>
                                OK
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </VStack>
    )
}

export default TimerForm
