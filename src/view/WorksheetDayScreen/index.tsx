import { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'

import { Box, Flex, useTheme } from 'native-base'

import PeriodItem from './components/PeriodItem'
import ActivityIndicator from '@components/ActivityIndicator'
import AlertBox from '@components/AlertBox'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { ERouteName, TReactNavigationStackParamList } from '@router/types'
import { FlashList } from '@shopify/flash-list'
import { getWorksheetDayByIdFnUseCase } from '@useCases/worksheet/getWorksheetDayById'
import { getErrorMessage } from '@utils/getErrorMessage'
import { capitalize } from '@utils/strings'
import dayjs from 'dayjs'
import useSWR from 'swr'

const WorksheetDayScreen: React.FC = () => {
    const { sizes, colors } = useTheme()
    const [refreshing, setRefreshing] = useState(false)
    const {
        params: { worksheetId, dayId },
    } = useRoute<RouteProp<TReactNavigationStackParamList, 'WorksheetDay'>>()
    const navigation = useNavigation()

    const { data, isLoading, error, mutate } = useSWR([worksheetId, dayId, 'worksheetDay'], (args: string[]) =>
        getWorksheetDayByIdFnUseCase(args[0], args[1])
    )

    useEffect(() => {
        if (!data?.date) return
        const date = capitalize(dayjs(data.date).format('ddd[.] DD/MM/YYYY'))
        navigation.setOptions({ title: date })
    }, [data])

    const handleRefresh = async () => {
        setRefreshing(true)
        await mutate()
        setRefreshing(false)
    }

    if (error) return <AlertBox type="error" title="Ocorreu um erro" text={getErrorMessage(error)} />

    if (!data && isLoading)
        return (
            <Flex flex={1} alignItems="center" justifyContent="center">
                <ActivityIndicator size={30} />
            </Flex>
        )

    if (!data) return <AlertBox type="info" text="Nenhum resultado encontrato" />

    return (
        <FlashList
            data={data.periods}
            horizontal={false}
            renderItem={({ item, index }) => (
                <Box m={2} flex={1}>
                    <PeriodItem
                        worksheetId={worksheetId}
                        dayId={dayId}
                        periodNumber={index + 1}
                        item={item}
                        date={data.date}
                        onGroupPress={() => navigation.navigate(ERouteName.SectionCarousel, { dayId, worksheetId })}
                    />
                </Box>
            )}
            contentContainerStyle={{ paddingVertical: sizes[7], paddingHorizontal: sizes[5] }}
            showsHorizontalScrollIndicator={false}
            estimatedItemSize={640}
            refreshControl={
                <RefreshControl
                    tintColor={colors.red[500]}
                    colors={[colors.red[600]]}
                    style={{ backgroundColor: colors.gray[900] }}
                    onRefresh={handleRefresh}
                    refreshing={refreshing}
                />
            }
        />
    )
}

export default WorksheetDayScreen
