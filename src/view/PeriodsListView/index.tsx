import { useCallback } from 'react'

import { Box, useTheme } from 'native-base'

import { useLoggedUser } from '@contexts/user/userContext'
import { IDayModel } from '@models/day'
import { StackActions, useFocusEffect, useNavigation } from '@react-navigation/native'
import { ERouteName } from '@router/types'
import { FlashList } from '@shopify/flash-list'

import PeriodItem from './components/PeriodItem'

export interface PeriodsListView {
    day: IDayModel
}

const PeriodsListView: React.FC<PeriodsListView> = ({ day }) => {
    const { sizes } = useTheme()
    const { dispatch } = useNavigation()
    const user = useLoggedUser()

    useFocusEffect(
        useCallback(() => {
            if (!user) dispatch(StackActions.replace(ERouteName.LoginScreen))
        }, [user])
    )

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
            contentContainerStyle={{ paddingVertical: sizes[7], paddingHorizontal: sizes[3] }}
            showsHorizontalScrollIndicator={false}
            estimatedItemSize={640}
        />
    )
}

export default PeriodsListView
