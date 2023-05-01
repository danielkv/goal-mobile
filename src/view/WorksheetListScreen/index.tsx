import { useState } from 'react'
import { RefreshControl } from 'react-native'

import { Box, Flex, useTheme } from 'native-base'

import WorksheetListItem from './components/WorksheetListItem'
import ActivityIndicator from '@components/ActivityIndicator'
import AlertBox from '@components/AlertBox'
import { useNavigation } from '@react-navigation/native'
import { ERouteName } from '@router/types'
import { FlashList } from '@shopify/flash-list'
import { getWorksheetListUseCase } from '@useCases/worksheet/getWorksheetList'
import { getErrorMessage } from '@utils/getErrorMessage'
import useSWR from 'swr'

const WorksheetListScreen: React.FC = () => {
    const { sizes, colors } = useTheme()
    const [refreshing, setRefreshing] = useState(false)
    const { navigate } = useNavigation()

    const { data, isLoading, error, mutate } = useSWR('worksheetList', getWorksheetListUseCase, {})

    const handleRefresh = async () => {
        setRefreshing(true)
        await mutate()
        setRefreshing(false)
    }

    if (error) return <AlertBox type="error" title="Ocorreu um erro" text={getErrorMessage(error)} />

    if (!data?.length && isLoading)
        return (
            <Flex flex={1} alignItems="center" justifyContent="center">
                <ActivityIndicator size={30} />
            </Flex>
        )

    return (
        <FlashList
            data={data}
            renderItem={({ item, index }) => (
                <Box mb={4}>
                    <WorksheetListItem
                        onPress={(item) => navigate(ERouteName.WorksheetDays, { id: item.id })}
                        item={item}
                        current={index === 0}
                    />
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

export default WorksheetListScreen
