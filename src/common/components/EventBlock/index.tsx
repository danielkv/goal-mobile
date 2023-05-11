import { useRef, useState } from 'react'

import { AlertDialog, Button, HStack, Text, VStack, useTheme } from 'native-base'

import { MaterialIcons } from '@expo/vector-icons'

import EventBlockRound from '@components/EventBlockRound'
import OpenTimerButton, { OpenTimerButtonProps } from '@components/OpenTimerButton'
import { IEventBlock } from '@models/block'
import { TTimerTypes } from '@models/time'
import { eventBlockTransformer } from '@utils/transformer/eventblock'

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
    const { colors } = useTheme()
    const blockTitle = eventBlockTransformer.displayTitle(block)
    const [infoOpen, setInfoOpen] = useState(false)
    const ref = useRef()

    const timerType = getTimerType(block)

    const handleCloseInfo = () => {
        setInfoOpen(false)
    }
    const handleOpenInfo = () => {
        setInfoOpen(true)
    }

    return (
        <>
            {(!!block.name || !!blockTitle || !!block.info) && (
                <HStack bg={'gray.900'} justifyContent="space-between" alignItems="flex-start">
                    <VStack mt={1}>
                        {!!block.name && (
                            <Text fontSize="xs" textAlign={textAlign}>
                                {block.name}
                            </Text>
                        )}
                        {!!blockTitle &&
                            (textAlign === 'center' ? (
                                <Text px={5} py={1} mb={1} fontSize="sm" textAlign={textAlign}>
                                    {blockTitle}
                                </Text>
                            ) : (
                                <Text fontWeight="bold" fontSize="md" ml={1} mb={1} textAlign={textAlign}>
                                    {blockTitle}
                                </Text>
                            ))}
                    </VStack>
                </HStack>
            )}

            {(!!timerType || !!block.info) && (
                <HStack space={2} my={2}>
                    {!!timerType && <OpenTimerButton type={timerType} settings={getTimerSettings(block)} />}
                    {!!block.info && (
                        <Button
                            flex={1}
                            leftIcon={<MaterialIcons name="info-outline" size={26} color={colors.gray[300]} />}
                            colorScheme="gray"
                            size="sm"
                            onPress={handleOpenInfo}
                        >
                            Informações
                        </Button>
                    )}
                </HStack>
            )}

            <VStack space={2}>
                {block.rounds.map((round, index) => (
                    <EventBlockRound key={`${round.type}${index}`} round={round} textAlign={textAlign} />
                ))}
            </VStack>

            <AlertDialog leastDestructiveRef={ref} isOpen={infoOpen} onClose={handleCloseInfo}>
                <AlertDialog.Content bg="gray.600">
                    <AlertDialog.Header bg="gray.600" borderColor="gray.900">
                        <HStack alignItems="center" space={2}>
                            <MaterialIcons name="info" size={18} color={colors.gray[500]} />
                            <Text color="gray.100">Informações</Text>
                        </HStack>
                    </AlertDialog.Header>
                    <AlertDialog.Body bg="gray.600">
                        <Text fontSize="sm" color="gray.300">
                            {block.info}
                        </Text>
                    </AlertDialog.Body>
                    <AlertDialog.Footer bg="gray.600" borderColor="gray.900">
                        <Button.Group space={2}>
                            <Button colorScheme="red" onPress={handleCloseInfo}>
                                OK
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
        </>
    )
}

export default EventBlock
