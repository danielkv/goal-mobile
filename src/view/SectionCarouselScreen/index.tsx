import { useEffect } from 'react'
import { Dimensions } from 'react-native'

import { Box, Flex, useTheme } from 'native-base'

import SectionItem from './components/SectionItem'
import { IFlatSection } from '@common/interfaces/worksheet'
import ActivityIndicator from '@components/ActivityIndicator'
import AlertBox from '@components/AlertBox'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { TReactNavigationStackParamList } from '@router/types'
import { FlashList } from '@shopify/flash-list'
import { getWorksheetDayByIdFnUseCase } from '@useCases/worksheet/getWorksheetDayById'
import { getErrorMessage } from '@utils/getErrorMessage'
import { capitalize } from '@utils/strings'
import dayjs from 'dayjs'
import useSWR from 'swr'

const SECTION_CARD_WIDTH = Dimensions.get('window').width * 0.8
const SECTION_CARD_MARGIN = 17

const SectionCarouselScreen: React.FC = () => {
    const { sizes } = useTheme()

    const {
        params: { worksheetId, dayId, sectionIndex },
    } = useRoute<RouteProp<TReactNavigationStackParamList, 'SectionCarousel'>>()
    const navigation = useNavigation()

    const { data, isLoading, error } = useSWR([worksheetId, dayId, 'worksheetDay'], (args: string[]) =>
        getWorksheetDayByIdFnUseCase(args[0], args[1])
    )

    useEffect(() => {
        if (!data?.date) return
        const date = capitalize(dayjs(data.date).format('ddd[.] DD/MM/YYYY'))
        navigation.setOptions({ title: date })
    }, [data])

    if (error) return <AlertBox type="error" title="Ocorreu um erro" text={getErrorMessage(error)} />

    if (!data && isLoading)
        return (
            <Flex flex={1} alignItems="center" justifyContent="center">
                <ActivityIndicator size={30} />
            </Flex>
        )

    const sections =
        data?.periods.flatMap<IFlatSection>((periods, periodIndex) =>
            periods.groups.map((section, sectionIndex) => ({
                period: periodIndex + 1,
                sectionNumber: sectionIndex + 1,
                ...section,
            }))
        ) || []

    return (
        <FlashList
            data={sections}
            horizontal
            initialScrollIndex={sectionIndex}
            renderItem={({ item, index }) => (
                <Box m={`${SECTION_CARD_MARGIN}px`}>
                    <SectionItem width={SECTION_CARD_WIDTH} item={item} />
                </Box>
            )}
            snapToInterval={SECTION_CARD_WIDTH + SECTION_CARD_MARGIN * 2}
            showsHorizontalScrollIndicator={false}
            estimatedItemSize={SECTION_CARD_WIDTH + SECTION_CARD_MARGIN * 2}
            contentContainerStyle={{
                paddingVertical: sizes[7],
                paddingHorizontal: sizes[4],
            }}
        />
    )
}

export default SectionCarouselScreen
