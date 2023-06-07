import { useCallback, useMemo } from 'react'
import { Dimensions } from 'react-native'
import PagerView from 'react-native-pager-view'
import Animated, {
    useAnimatedStyle,
    useDerivedValue,
    useEvent,
    useHandler,
    useSharedValue,
} from 'react-native-reanimated'

import { Box, HStack, ScrollView } from 'native-base'

import { IFlatSection } from '@common/interfaces/worksheet'
import { useLoggedUser } from '@contexts/user/userContext'
import { IDayModel } from '@models/day'
import { StackActions, useFocusEffect, useNavigation } from '@react-navigation/native'
import { ERouteName } from '@router/types'

import SectionItem from './components/SectionItem'

const SCREEN_WIDTH = Dimensions.get('window').width
const SECTION_CARD_WIDTH = SCREEN_WIDTH * 0.9
const SECTION_CARD_MARGIN = 17

export interface SectionCarouselView {
    day: IDayModel
}

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView)

function usePageScrollHandler(handlers: any, dependencies?: any) {
    const { context, doDependenciesDiffer } = useHandler(handlers, dependencies)
    const subscribeForEvents = ['onPageScroll']

    return useEvent(
        (event: any) => {
            'worklet'
            const { onPageScroll } = handlers
            if (onPageScroll && event.eventName.endsWith('onPageScroll')) {
                onPageScroll(event, context)
            }
        },
        subscribeForEvents,
        doDependenciesDiffer
    )
}

const DOT_MIN = 0.4
const DOT_MAX = 1.4
const DOT_DIFF = DOT_MAX - DOT_MIN

const SectionCarouselView: React.FC<SectionCarouselView> = ({ day }) => {
    const { dispatch } = useNavigation()
    const user = useLoggedUser()

    const offset = useSharedValue(0)
    const previous = useSharedValue(0)
    const next = useSharedValue(1)

    const scrollHandler = usePageScrollHandler({
        onPageScroll: (e: any) => {
            'worklet'
            offset.value = e.offset
            previous.value = e.position
            next.value = e.position + 1
        },
    })

    useFocusEffect(
        useCallback(() => {
            if (!user) dispatch(StackActions.replace(ERouteName.LoginScreen))
        }, [user])
    )

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
        <Box flexGrow={1} pt={6}>
            <HStack justifyContent="center" mb={6}>
                {sections.map((item, index) => {
                    const animatedValue = useDerivedValue(() => {
                        const realOffset =
                            index === previous.value ? 1 - offset.value : index === next.value ? offset.value : 0

                        return DOT_MIN + DOT_DIFF * realOffset
                    }, [previous, next, offset])

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
            <AnimatedPagerView style={{ flex: 1 }} onPageScroll={scrollHandler}>
                {sections.map((item, index) => (
                    <Box key={`${item.name}.${index}`}>
                        <ScrollView
                            contentContainerStyle={{ alignItems: 'center', paddingHorizontal: SECTION_CARD_MARGIN }}
                        >
                            <SectionItem width={SECTION_CARD_WIDTH} item={item} />
                        </ScrollView>
                    </Box>
                ))}
            </AnimatedPagerView>
        </Box>
    )
}

export default SectionCarouselView
