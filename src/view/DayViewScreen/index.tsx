import { useCallback, useEffect, useState } from 'react'

import { Box, Fab, Flex, HStack, IconButton } from 'native-base'

import { MaterialIcons } from '@expo/vector-icons'

import { useStorage } from '@common/hooks/useStorage'
import ActivityIndicator from '@components/ActivityIndicator'
import AlertBox from '@components/AlertBox'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { TReactNavigationStackParamList } from '@router/types'
import { getWorksheetDayByIdFnUseCase } from '@useCases/worksheet/getWorksheetDayById'
import { getErrorMessage } from '@utils/getErrorMessage'
import { capitalize } from '@utils/strings'
import PeriodsListView from '@view/PeriodsListView'
import SectionCarouselView from '@view/SectionCarouselView'
import dayjs from 'dayjs'
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake'
import useSWR from 'swr'

const DayViewScreen: React.FC = () => {
    const [keepAwake, setKeepAwake] = useState(false)

    const {
        currentValue: viewType,
        setItem: setViewType,
        loading,
    } = useStorage<'list' | 'carousel'>('@worksheetViewType', 'carousel')

    const {
        params: { worksheetId, dayId },
    } = useRoute<RouteProp<TReactNavigationStackParamList, 'DayView'>>()
    const navigation = useNavigation()

    const { data, isLoading, error } = useSWR([worksheetId, dayId, 'worksheetDay'], (args: string[]) =>
        getWorksheetDayByIdFnUseCase(args[0], args[1])
    )

    useEffect(() => {
        if (!data?.date) return
        const date = capitalize(dayjs(data.date).format('ddd[.] DD/MM/YYYY'))

        navigation.setOptions({
            title: date,
        })
    }, [data])

    useEffect(() => {
        deactivateKeepAwake()
    }, [])

    const handleToggleKeepAwake = useCallback(() => {
        if (keepAwake) {
            deactivateKeepAwake()
        } else {
            activateKeepAwakeAsync()
        }

        setKeepAwake(!keepAwake)
    }, [keepAwake])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HStack>
                    <IconButton size={12} rounded="full" onPress={handleToggleKeepAwake}>
                        <MaterialIcons name={!keepAwake ? 'lightbulb-outline' : 'lightbulb'} size={16} color="white" />
                    </IconButton>
                </HStack>
            ),
        })
    }, [viewType, keepAwake])

    if (error) return <AlertBox type="error" title="Ocorreu um erro" text={getErrorMessage(error)} />

    if ((!data && isLoading) || loading)
        return (
            <Flex flex={1} alignItems="center" justifyContent="center">
                <ActivityIndicator size={30} />
            </Flex>
        )

    if (!data) return <AlertBox type="info" text="Nenhum resultado encontrato" />

    return (
        <Box flex={1}>
            {viewType === 'carousel' ? <SectionCarouselView day={data} /> : <PeriodsListView day={data} />}

            <Fab
                onPress={() => setViewType(viewType === 'list' ? 'carousel' : 'list')}
                icon={
                    <MaterialIcons name={viewType === 'list' ? 'view-carousel' : 'view-list'} size={16} color="white" />
                }
                colorScheme="trueGray"
                mb={20}
            />
        </Box>
    )
}

export default DayViewScreen
