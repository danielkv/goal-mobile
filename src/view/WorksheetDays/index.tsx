import { useState } from 'react'
import { RefreshControl } from 'react-native'

import { Box, Flex, useTheme } from 'native-base'

import WorksheetDayItem from './components/WorksheetListItem'
import ActivityIndicator from '@components/ActivityIndicator'
import AlertBox from '@components/AlertBox'
import { FlashList } from '@shopify/flash-list'
import { getWorksheetListUseCase } from '@useCases/worksheet/getWorksheetList'
import { getErrorMessage } from '@utils/getErrorMessage'
import useSWR from 'swr'

const WorksheetDays: React.FC = () => {
    const { sizes, colors } = useTheme()
    const [refreshing, setRefreshing] = useState(false)

    const { data, isLoading, error, mutate } = useSWR('worksheetList', getWorksheetListUseCase, {})

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
            data={data}
            numColumns={2}
            horizontal={false}
            renderItem={({ item, index }) => (
                <Box mb={4}>
                    <WorksheetDayItem item={item} current={index === 0} />
                </Box>
            )}
            estimatedItemSize={93}
            contentContainerStyle={{ padding: sizes[7] }}
            showsHorizontalScrollIndicator={false}
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
