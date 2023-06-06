import { useState } from 'react'

import Button from '@components/Button'
import EventBlockRound from '@components/EventBlockRound'
import OpenTimerButton, { OpenTimerButtonProps } from '@components/OpenTimerButton'
import { MaterialIcons } from '@expo/vector-icons'
import { IEventBlock } from '@models/block'
import { TTimerTypes } from '@models/time'
import { eventBlockTransformer } from '@utils/transformer/eventblock'

import { AlertDialog, Text, YStack, useTheme } from 'tamagui'
import { XStack } from 'tamagui'

export interface PeriodEventBlock {
    block: IEventBlock
    textAlign?: 'center' | 'left'
}

const getTimerSettings = (block: IEventBlock): OpenTimerButtonProps['settings'] => {
    switch (block.event_type) {
        case 'amrap':
        case 'max_weight':
        case 'for_time':
            return {
                numberOfRounds: block.numberOfRounds,
                timecap: block.timecap,
            }
        case 'emom':
            return {
                numberOfRounds: block.numberOfRounds,
                each: block.each,
            }
        case 'tabata':
            return {
                numberOfRounds: block.numberOfRounds,
                work: block.work,
                rest: block.rest,
            }
    }

    return {}
}

const getTimerType = (block: IEventBlock): Exclude<TTimerTypes, 'not_timed'> | null => {
    switch (block.event_type) {
        case 'emom':
            if (block.each && block.each > 0 && block.numberOfRounds && block.numberOfRounds > 0) return 'emom'
            break
        case 'tabata':
            if (
                block.work &&
                block.work > 0 &&
                block.rest &&
                block.rest > 0 &&
                block.numberOfRounds &&
                block.numberOfRounds > 0
            )
                return 'tabata'
            break
        case 'for_time':
        case 'max_weight':
        case 'amrap':
            if (block.timecap && block.timecap > 0) return 'for_time'
            break
    }
    return null
}

const EventBlock: React.FC<PeriodEventBlock> = ({ block, textAlign = 'center' }) => {
    const theme = useTheme()
    const blockTitle = eventBlockTransformer.displayTitle(block)
    const [infoOpen, setInfoOpen] = useState(false)

    const timerType = getTimerType(block)

    const handleCloseInfo = () => {
        setInfoOpen(false)
    }
    const handleOpenInfo = () => {
        setInfoOpen(true)
    }

    return (
        <>
            {(!!block.name || !!blockTitle) && (
                <XStack bg="$gray9" jc="space-between" ai="flex-start">
                    <YStack mt="$1">
                        {!!block.name && (
                            <Text fontSize="$3" textAlign={textAlign}>
                                {block.name}
                            </Text>
                        )}
                        {!!blockTitle &&
                            (textAlign === 'center' ? (
                                <Text px={5} py={1} mb={1} fontSize="$4" textAlign={textAlign}>
                                    {blockTitle}
                                </Text>
                            ) : (
                                <Text fontWeight="900" fontSize="$4" ml={1} mb={1} textAlign={textAlign}>
                                    {blockTitle}
                                </Text>
                            ))}
                    </YStack>
                </XStack>
            )}

            {(!!timerType || !!block.info) && (
                <XStack space="$2" my="$2">
                    {!!timerType && <OpenTimerButton type={timerType} settings={getTimerSettings(block)} />}
                    {!!block.info && (
                        <Button
                            flex={1}
                            icon={<MaterialIcons name="info-outline" size={26} color={theme.gray3.val} />}
                            onPress={handleOpenInfo}
                        >
                            Informações
                        </Button>
                    )}
                </XStack>
            )}

            <YStack space="$2">
                {block.rounds.map((round, index) => (
                    <EventBlockRound key={`${round.type}${index}`} round={round} textAlign={textAlign} />
                ))}
            </YStack>

            <AlertDialog open={infoOpen}>
                <AlertDialog.Portal>
                    <AlertDialog.Overlay
                        key="overlay"
                        animation="quick"
                        opacity={0.5}
                        enterStyle={{ opacity: 0 }}
                        exitStyle={{ opacity: 0 }}
                    />
                    <AlertDialog.Content
                        bordered
                        elevate
                        key="content"
                        animation={[
                            'quick',
                            {
                                opacity: {
                                    overshootClamping: true,
                                },
                            },
                        ]}
                        enterStyle={{ x: 0, y: -20, opacity: 0 }}
                        exitStyle={{ x: 0, y: 10, opacity: 0 }}
                        opacity={1}
                        w="90%"
                        x={0}
                        y={0}
                    >
                        <YStack space>
                            <AlertDialog.Title>Informações</AlertDialog.Title>
                            <AlertDialog.Description>{block.info}</AlertDialog.Description>

                            <XStack space="$3" justifyContent="flex-end">
                                <AlertDialog.Action asChild>
                                    <Button theme="active" onPress={handleCloseInfo}>
                                        OK
                                    </Button>
                                </AlertDialog.Action>
                            </XStack>
                        </YStack>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog>
        </>
    )
}

export default EventBlock
