import { useRef, useState } from 'react'

import { AlertDialog, Button, HStack, IconButton, Text, VStack, useTheme } from 'native-base'

import { MaterialIcons } from '@expo/vector-icons'

import EventBlockRound from '@components/EventBlockRound'
import { IEventBlock } from '@models/block'
import { eventBlockTransformer } from '@utils/transformer/eventblock'

export interface PeriodEventBlock {
    block: IEventBlock
    textAlign?: 'center' | 'left'
}

const EventBlock: React.FC<PeriodEventBlock> = ({ block, textAlign = 'center' }) => {
    const { colors } = useTheme()
    const blockTitle = eventBlockTransformer.displayTitle(block)
    const [infoOpen, setInfoOpen] = useState(false)
    const ref = useRef()

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
                    {block.info && (
                        <IconButton
                            rounded="full"
                            p={1}
                            onPress={handleOpenInfo}
                            icon={<MaterialIcons name="info" size={22} color={colors.gray[500]} />}
                        />
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
