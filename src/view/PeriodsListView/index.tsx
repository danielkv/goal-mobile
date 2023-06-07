import { useCallback } from 'react'

import { useLoggedUser } from '@contexts/user/userContext'
import { IDayModel } from '@models/day'
import { StackActions, useFocusEffect, useNavigation } from '@react-navigation/native'
import { ERouteName } from '@router/types'
import { FlashList } from '@shopify/flash-list'

import { Stack, getTokens } from 'tamagui'
import { useTheme } from 'tamagui'

import PeriodItem from './components/PeriodItem'

export interface PeriodsListView {
    day: IDayModel
}

const PeriodsListView: React.FC<PeriodsListView> = ({ day }) => {
    const theme = useTheme()
    const { size } = getTokens()

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
                    <Stack m="$2" f={1}>
                        <PeriodItem
                            periodNumber={index + 1}
                            item={item}
                            date={day.date}
                            indexSum={indexSum - item.sections.length}
                        />
                    </Stack>
                )
            }}
            contentContainerStyle={{ padding: size['2.5'].val, backgroundColor: theme.gray7.val }}
            showsHorizontalScrollIndicator={false}
            estimatedItemSize={640}
        />
    )
}

export default PeriodsListView
