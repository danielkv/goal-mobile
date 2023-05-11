import React from 'react'
import { SvgProps } from 'react-native-svg'

import { Button, IconButton, useTheme } from 'native-base'

import EmomSvg from '@assets/svg/emom.svg'
import StopwatchSvg from '@assets/svg/stopwatch.svg'
import TabataSvg from '@assets/svg/tabata.svg'
import { IEMOMTimer, ITabataTimer, ITimecapTimer, TTimerTypes } from '@models/time'
import { useNavigation } from '@react-navigation/native'

export interface OpenTimerButtonProps {
    variant?: 'button' | 'icon'
    type: Exclude<TTimerTypes, 'not_timed'>
    settings: Partial<ITabataTimer & IEMOMTimer & ITimecapTimer>
}

const icons: Record<Exclude<TTimerTypes, 'not_timed'>, React.FC<SvgProps>> = {
    emom: EmomSvg,
    for_time: StopwatchSvg,
    amrap: StopwatchSvg,
    tabata: TabataSvg,
}

const OpenTimerButton: React.FC<OpenTimerButtonProps> = ({ type, settings, variant = 'button' }) => {
    const { colors } = useTheme()
    const { navigate } = useNavigation()

    if (!['emom', 'for_time', 'amrap', 'tabata'].includes(type)) return null

    const handleOnPress = () => {
        switch (type) {
            case 'for_time':
            case 'amrap':
                return navigate('StopwatchTimerScreen', {
                    numberOfRounds: settings.numberOfRounds,
                    timecap: settings.timecap,
                })
            case 'emom':
                return navigate('EmomTimerScreen', { numberOfRounds: settings.numberOfRounds, each: settings.each })
            case 'tabata':
                return navigate('TabataTimerScreen', {
                    numberOfRounds: settings.numberOfRounds,
                    work: settings.work,
                    rest: settings.rest,
                })
        }
    }

    const Icon = icons[type]

    if (variant === 'icon')
        return (
            <IconButton
                rounded="full"
                p={2}
                icon={<Icon width={22} height={22} fill={colors.gray[300]} />}
                onPress={handleOnPress}
            />
        )

    return (
        <Button
            flex={1}
            leftIcon={<Icon width={24} height={24} fill={colors.gray[300]} />}
            colorScheme="gray"
            size="sm"
            onPress={handleOnPress}
        >
            Abrir Timer
        </Button>
    )
}

export default OpenTimerButton
