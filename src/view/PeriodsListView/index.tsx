import { Box, useTheme } from 'native-base'

import PeriodItem from './components/PeriodItem'
import { IDayModel } from '@models/day'
import { FlashList } from '@shopify/flash-list'

export interface PeriodsListView {
    day: IDayModel
}

const PeriodsListView: React.FC<PeriodsListView> = ({ day }) => {
    const { sizes } = useTheme()

    let indexSum = 0

    return (
        <FlashList
            data={day.periods}
            horizontal={false}
            renderItem={({ item, index }) => {
                indexSum += item.sections.length
                return (
                    <Box m={2} flex={1}>
                        <PeriodItem
                            periodNumber={index + 1}
                            item={item}
                            date={day.date}
                            indexSum={indexSum - item.sections.length}
                        />
                    </Box>
                )
            }}
            contentContainerStyle={{ paddingVertical: sizes[7], paddingHorizontal: sizes[5] }}
            showsHorizontalScrollIndicator={false}
            estimatedItemSize={640}
        />
    )
}

export default PeriodsListView
