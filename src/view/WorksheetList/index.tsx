import { Box, Flex, useTheme } from 'native-base'

import WorksheetListItem from './components/WorksheetListItem'
import ActivityIndicator from '@components/ActivityIndicator'
import AlertBox from '@components/AlertBox'
import { FlashList } from '@shopify/flash-list'
import { getWorksheetListUseCase } from '@useCases/worksheet/getWorksheetList'
import { getErrorMessage } from '@utils/getErrorMessage'
import useSWR from 'swr'

const WorksheetList: React.FC = () => {
    const { sizes } = useTheme()

    const { data, isLoading, error } = useSWR('worksheetList', getWorksheetListUseCase)

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
            renderItem={({ item, index }) => (
                <Box mb={4}>
                    <WorksheetListItem item={item} current={index === 0} />
                </Box>
            )}
            estimatedItemSize={93}
            contentContainerStyle={{ padding: sizes[7] }}
        />
    )
}

export default WorksheetList
