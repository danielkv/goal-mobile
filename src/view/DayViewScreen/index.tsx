import { useEffect } from 'react'

import { Box, Fab, Flex, HStack, IconButton } from 'native-base'

import { useStorage } from '@common/hooks/useStorage'
import ActivityIndicator from '@components/ActivityIndicator'
import AlertBox from '@components/AlertBox'
import { MaterialIcons } from '@expo/vector-icons'
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
    const {
        currentValue: keepAwake,
        setItem: setKeepAwake,
        loading: loadingKeepAwake,
    } = useStorage<'enabled' | 'disabled'>('@worksheetKeepAwake', 'disabled')

    const {
        currentValue: viewType,
        setItem: setViewType,
        loading,
    } = useStorage<'list' | 'carousel'>('@worksheetViewType', 'carousel')

    const {
        params: { worksheetId, dayId },
    } = useRoute<RouteProp<TReactNavigationStackParamList, 'DayView'>>()
    const navigation = useNavigation()

    const { data, isLoading, error } = useSWR(
        [worksheetId, dayId, 'worksheetDay'],
        (args: string[]) => getWorksheetDayByIdFnUseCase(args[0], args[1]),
        {
            onSuccess(result) {
                if (!result?.date) return
                const date = capitalize(dayjs(result.date).format('ddd[.] DD/MM/YYYY'))

                navigation.setOptions({
                    title: date,
                })
            },
        }
    )

    useEffect(() => {
        return () => {
            deactivateKeepAwake()
        }
    })

    useEffect(() => {
        if (keepAwake === 'disabled') {
            deactivateKeepAwake()
        } else {
            activateKeepAwakeAsync()
        }
    }, [keepAwake])

    useEffect(() => {
        if (loadingKeepAwake) return

        navigation.setOptions({
            headerRight: () => (
                <HStack>
                    <IconButton
                        size={12}
                        rounded="full"
                        onPress={() => setKeepAwake(keepAwake === 'enabled' ? 'disabled' : 'enabled')}
                    >
                        <MaterialIcons
                            name={keepAwake === 'disabled' ? 'lightbulb-outline' : 'lightbulb'}
                            size={16}
                            color="white"
                        />
                    </IconButton>
                </HStack>
            ),
        })
    }, [viewType, keepAwake, loadingKeepAwake])

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
