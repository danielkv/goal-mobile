declare module '*.png' {
    import { ImageSourcePropType } from 'react-native'
    const value: ImageSourcePropType
    export default value
}

declare module '*.svg' {
    import React from 'react'
    import { SvgProps } from 'react-native-svg'
    const content: React.FC<SvgProps>
    export default content
}

declare module 'react-native-new-snap-carousel' {
    import Carousel from 'react-native-snap-carousel'

    export * from 'react-native-snap-carousel'

    export default Carousel
}
