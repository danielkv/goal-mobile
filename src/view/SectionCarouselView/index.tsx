import { useMemo, useState } from 'react'
import { Dimensions } from 'react-native'
import PagerView from 'react-native-pager-view'
import Animated, { Easing, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated'

import { Box, HStack, ScrollView } from 'native-base'

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
        <Box flexGrow={1} py={6}>
            <HStack justifyContent="center" mb={6}>
                {sections.map((item, index) => {
                    const selected = index === activeSlide

                    const animatedValue = useDerivedValue(() => {
                        return withTiming(selected ? 1 : 0.4, { duration: 100, easing: Easing.ease })
                    }, [selected])

                    const handlerStyle = useAnimatedStyle(() => {
                        return {
                            transform: [{ scale: animatedValue.value }],
                            opacity: animatedValue.value,
                        }
                    })

                    return (
                        <Animated.View
                            key={`dot.${item.name}.${index}`}
                            style={[
                                { width: 8, height: 8, marginHorizontal: 4, borderRadius: 4, backgroundColor: 'white' },
                                handlerStyle,
                            ]}
                        />
                    )
                })}
            </HStack>
            <PagerView style={{ flex: 1 }} onPageSelected={({ nativeEvent: { position } }) => setActiveSlide(position)}>
                {sections.map((item, index) => (
                    <Box key={`${item.name}.${index}`} mx={`${SECTION_CARD_MARGIN}px`}>
                        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
                            <SectionItem width={SECTION_CARD_WIDTH} item={item} />
                        </ScrollView>
                    </Box>
                ))}
            </PagerView>
        </Box>
    )
}

export default SectionCarouselView
