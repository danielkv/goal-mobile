import React from 'react'
import { SvgProps } from 'react-native-svg'

import EmomSvg from '@assets/svg/emom.svg'
import StopwatchSvg from '@assets/svg/stopwatch.svg'
import TabataSvg from '@assets/svg/tabata.svg'
import Button from '@components/Button'
import { IEMOMTimer, ITabataTimer, ITimecapTimer, TTimerTypes } from '@models/time'
import { useNavigation } from '@react-navigation/native'

import { useTheme } from 'tamagui'

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
    const theme = useTheme()
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
            <Button size="$4" onPress={handleOnPress} circular>
                <Icon width={22} height={22} fill={theme.gray3.val} />
            </Button>
        )

    return (
        <Button flex={1} icon={<Icon width={24} height={24} fill={theme.gray3.val} />} onPress={handleOnPress}>
            Abrir Timer
        </Button>
    )
}

export default OpenTimerButton
