import React, { useState } from 'react'
import { TextInput } from 'react-native'

import { HStack, Text, useTheme } from 'native-base'

import dayjs from 'dayjs'

export interface TimeFieldProps {
    value: number
    onChange: (value: number) => void
}

function splitTime(time: number): [string, string] {
    const duration = dayjs.duration(time, 'seconds')

    return [duration.format('mm'), duration.format('ss')]
}

export function stringTimeToSeconds(string: string): number {
    const splited = string.split(':')
    const minutes = Number(splited[0])
    const seconds = Number(splited[1])

    if (Number.isNaN(minutes) || Number.isNaN(seconds)) return 0

    const duration = dayjs.duration({ minutes, seconds })

    return duration.asSeconds()
}

const TimeField: React.FC<TimeFieldProps> = ({ value, onChange }) => {
    const { colors, fontConfig } = useTheme()
    const splittedTime = splitTime(value)

    const [minutes, setMinutes] = useState(() => splittedTime[0])
    const [seconds, setSeconds] = useState(() => splittedTime[1])

    const handleChange = (input: 'minutes' | 'seconds') => (value: string) => {
        const m = input === 'minutes' ? value : minutes
        const s = input === 'seconds' ? value : seconds

        if (input === 'minutes') {
            setMinutes(m)
        } else {
            setSeconds(s)
        }

        const secondsFinal = stringTimeToSeconds(`${m}:${s}`)
        onChange(secondsFinal)
    }

    return (
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
                onBlur={() => {
                    setMinutes((prev) => dayjs.duration(Number(prev), 'minute').format('mm'))
                    setSeconds((prev) => dayjs.duration(Number(prev), 'seconds').format('ss'))
                }}
                maxLength={2}
                value={minutes}
                onChangeText={handleChange('minutes')}
            />
            <Text fontWeight="bold" fontSize="5xl" lineHeight="5xl">
                :
            </Text>
            <TextInput
                keyboardType="number-pad"
                onBlur={() => {
                    setSeconds((prev) => dayjs.duration(Number(prev), 'seconds').format('ss'))
                }}
                style={{
                    textAlign: 'center',
                    fontSize: 60,
                    fontFamily: fontConfig.Inter[700].normal,
                    color: colors.gray[200],
                    lineHeight: 70,
                    width: 100,
                }}
                maxLength={2}
                value={seconds}
                onChangeText={handleChange('seconds')}
            />
        </HStack>
    )
}

export default TimeField
