import Pressable from '@components/Pressable'
import { MaterialIcons } from '@expo/vector-icons'
import { IDayModel } from '@models/day'
import { pluralize } from '@utils/strings'

import dayjs from 'dayjs'
import { Circle, H3, Stack, Text, useTheme } from 'tamagui'

export interface WorksheetDayItemProps {
    item: IDayModel

    onPress?: (item: IDayModel) => void
}

const WorksheetDayItem: React.FC<WorksheetDayItemProps> = ({ item, onPress }) => {
    const theme = useTheme()

    const date = dayjs(item.date)

    const periodsDisplay = `${item.periods.length} ${pluralize(item.periods.length, 'período')}`

    return (
        <Stack>
            <Pressable
                f={1}
                effectColor="$gray7"
                bg="$gray6"
                br="$4"
                onPress={() => {
                    onPress?.(item)
                }}
                ai="center"
                py="$4"
            >
                <Stack mb="$2">
                    <MaterialIcons name="calendar-today" size={24} color={theme.gray4.val} />
                </Stack>

                <H3 color="$gray1" fontWeight="700" fontSize="$3">
                    {date.format('dddd')}
                </H3>

                <Text color="$gray3" fontSize="$2">
                    {date.format('DD/MM/YYYY')}
                </Text>
                <Text color="$gray3" fontSize="$2">
                    {periodsDisplay}
                </Text>

                {date.isSame(dayjs(), 'date') && <Circle position="absolute" top={2} right={2} bg="$red5" size={2} />}
            </Pressable>
        </Stack>
    )
}

export default WorksheetDayItem
