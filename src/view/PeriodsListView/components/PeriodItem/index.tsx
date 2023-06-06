import BlockItem from '@components/BlockItem'
import { IPeriod } from '@models/day'

import dayjs from 'dayjs'
import { Stack, Text, XStack, YStack } from 'tamagui'

export interface WorksheetDayItemProps {
    item: IPeriod
    date: string
    periodNumber: number
    indexSum: number
}

const PeriodItem: React.FC<WorksheetDayItemProps> = ({ item, date, periodNumber }) => {
    const dateJs = dayjs(date)

    return (
        <Stack flex={1} bg="$gray8" br="$4">
            <XStack ai="center" jc="space-between">
                <Stack btlr="$4" bg="$red5" w={55} h={55} ai="center" jc="center">
                    <Text color="white" fontWeight="900" fontSize="$7">
                        {periodNumber}
                    </Text>
                </Stack>

                <Text mr="$5" fontSize="$3">
                    {dateJs.format('ddd[.] DD/MM/YYYY')}
                </Text>
            </XStack>
            <YStack ai="center" gap="$4">
                {item.sections.map((group, index) => (
                    <YStack key={`${group.name}.${index}`} alignItems="center" mx="$2" my="$2">
                        <Stack>
                            <Text textAlign="center" bg="$red5" px="$7" py="$3" fontWeight="bold">
                                {group.name}
                            </Text>
                        </Stack>
                        <YStack gap="$1" mt="$3">
                            {group.blocks.map((block, index) => (
                                <BlockItem key={`${block.type}.${index}`} block={block} textAlign="center" />
                            ))}
                        </YStack>
                    </YStack>
                ))}
            </YStack>
        </Stack>
    )
}

export default PeriodItem
