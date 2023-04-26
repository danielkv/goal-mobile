import { useState } from 'react'
import { RefreshControl } from 'react-native'

import { Box, Flex, useTheme } from 'native-base'

import WorksheetDayItem from './components/WorksheetDayItem'
import ActivityIndicator from '@components/ActivityIndicator'
import AlertBox from '@components/AlertBox'
import { RouteProp, useRoute } from '@react-navigation/native'
import { TReactNavigationStackParamList } from '@router/types'
import { FlashList } from '@shopify/flash-list'
import { getWorksheetByIdUseCase } from '@useCases/worksheet/getWorksheetById'
import { getErrorMessage } from '@utils/getErrorMessage'
import useSWR from 'swr'

const WorksheetDays: React.FC = () => {
    const { sizes, colors } = useTheme()
    const [refreshing, setRefreshing] = useState(false)
    const {
        params: { id: worksheetId },
    } = useRoute<RouteProp<TReactNavigationStackParamList, 'WorksheetDays'>>()

    const { data, isLoading, error, mutate } = useSWR(
        [worksheetId, 'worksheetDay'],
        (args: string[]) => getWorksheetByIdUseCase(args[0]),
        {}
    )

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

    return (
        <FlashList
            data={data?.days}
            numColumns={2}
            horizontal={false}
            renderItem={({ item }) => (
                <Box m={2} flex={1}>
                    <WorksheetDayItem item={item} />
                </Box>
            )}
            contentContainerStyle={{ paddingVertical: sizes[7], paddingHorizontal: sizes[5] }}
            showsHorizontalScrollIndicator={false}
            estimatedItemSize={128}
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

export default WorksheetDays
