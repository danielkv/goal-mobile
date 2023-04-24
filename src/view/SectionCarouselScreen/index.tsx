import { useEffect, useMemo, useState } from 'react'
import { Dimensions } from 'react-native'
import Carousel, { Pagination } from 'react-native-new-snap-carousel'

import { Box, Flex, ScrollView, useTheme } from 'native-base'

import SectionItem from './components/SectionItem'
import { IFlatSection } from '@common/interfaces/worksheet'
import ActivityIndicator from '@components/ActivityIndicator'
import AlertBox from '@components/AlertBox'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { TReactNavigationStackParamList } from '@router/types'
import { getWorksheetDayByIdFnUseCase } from '@useCases/worksheet/getWorksheetDayById'
import { getErrorMessage } from '@utils/getErrorMessage'
import { capitalize } from '@utils/strings'
import dayjs from 'dayjs'
import useSWR from 'swr'

const SCREEN_WIDTH = Dimensions.get('window').width
const SECTION_CARD_WIDTH = SCREEN_WIDTH * 0.8
const SECTION_CARD_MARGIN = 17

const SectionCarouselScreen: React.FC = () => {
    const { sizes } = useTheme()

    const {
        params: { worksheetId, dayId, sectionIndex },
    } = useRoute<RouteProp<TReactNavigationStackParamList, 'SectionCarousel'>>()
    const navigation = useNavigation()

    const [activeSlide, setActiveSlide] = useState(sectionIndex)

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

    const sections = useMemo(
        () =>
            data?.periods.flatMap<IFlatSection>((periods, periodIndex) =>
                periods.sections.map((section, sectionIndex) => ({
                    period: periodIndex + 1,
                    sectionNumber: sectionIndex + 1,
                    ...section,
                }))
            ) || [],
        []
    )

    return (
        <Box flexGrow={1}>
            <Pagination
                dotsLength={sections.length}
                activeDotIndex={activeSlide}
                containerStyle={{ paddingVertical: sizes[3] }}
                dotStyle={{
                    width: 8,
                    height: 8,
                    backgroundColor: 'white',
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.5}
            />
            <Carousel
                data={sections}
                renderItem={({ item }) => (
                    <Box mx={`${SECTION_CARD_MARGIN}px`}>
                        <ScrollView>
                            <SectionItem width={SECTION_CARD_WIDTH} item={item} />
                        </ScrollView>
                    </Box>
                )}
                layout="default"
                onSnapToItem={(index) => setActiveSlide(index)}
                sliderWidth={SCREEN_WIDTH}
                itemWidth={SECTION_CARD_WIDTH + SECTION_CARD_MARGIN * 2}
            />
        </Box>
    )
}

export default SectionCarouselScreen
