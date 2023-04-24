import { useMemo, useState } from 'react'
import { Dimensions } from 'react-native'
import Carousel, { Pagination } from 'react-native-new-snap-carousel'

import { Box, ScrollView, useTheme } from 'native-base'

import SectionItem from './components/SectionItem'
import { IFlatSection } from '@common/interfaces/worksheet'
import { IDayModel } from '@models/day'

const SCREEN_WIDTH = Dimensions.get('window').width
const SECTION_CARD_WIDTH = SCREEN_WIDTH * 0.8
const SECTION_CARD_MARGIN = 17

export interface SectionCarouselView {
    day: IDayModel
}

const SectionCarouselView: React.FC<SectionCarouselView> = ({ day }) => {
    const { sizes } = useTheme()

    const initialSection = 0

    const [activeSlide, setActiveSlide] = useState(initialSection)

    const sections = useMemo(
        () =>
            day?.periods.flatMap<IFlatSection>((periods, periodIndex) =>
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

export default SectionCarouselView
