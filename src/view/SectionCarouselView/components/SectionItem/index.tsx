import { IFlatSection } from '@common/interfaces/worksheet'
import BlockItem from '@components/BlockItem'

import { Stack, Text, XStack, YStack } from 'tamagui'

export interface SectionItemProps {
    item: IFlatSection
    width: number
}

const SectionItem: React.FC<SectionItemProps> = ({ item, width }) => {
    const sectionNumber = `${item.period}.${item.sectionNumber}`
    return (
        <YStack width={width} bg="$gray8" br="$4">
            <XStack alignItems="center">
                <Stack btlr="$4" bg="$red5" w={55} h={55} ai="center" jc="center">
                    <Text color="white" fontWeight="800" fontSize="$6">
                        {sectionNumber}
                    </Text>
                </Stack>

                <Text ml={5} fontWeight="bold">
                    {item.name}
                </Text>
            </XStack>

            <YStack my="$5" space="$4" px="$2">
                {item.blocks.map((block, index) => (
                    <Stack key={`${block.type}.${index}`} bg="$gray9" br="$4" p="$2">
                        <Stack mb="$2">
                            <BlockItem block={block} textAlign="left" />
                        </Stack>
                        <Stack
                            px="$2"
                            py="$1"
                            btlr="$2"
                            btrr="$2"
                            bg="$gray5"
                            position="absolute"
                            bottom={0}
                            right="$3"
                        >
                            <Text fontSize="$3">{`${sectionNumber}.${index + 1}`}</Text>
                        </Stack>
                    </Stack>
                ))}
            </YStack>
        </YStack>
    )
}

export default SectionItem
