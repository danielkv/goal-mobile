import { PixelRatio } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { extendTheme } from 'native-base'

const standardScreenHeight = 740

export const theme = extendTheme({
    colors: {
        // Add new color
        primary: {
            50: '#FDB9C4',
            100: '#FB9AAA',
            200: '#F87A8F',
            300: '#F55C75',
            400: '#F23E5B',
            500: '#EE2042',
            600: '#C81734',
            700: '#A00F27',
            800: '#77091B',
            900: '#4C0511',
        },
        gray: {
            100: '#F5F5F5',
            200: '#D3D3D3',
            300: '#ABABAB',
            400: '#999999',
            500: '#666666',
            600: '#323232',
            700: '#262626',
            800: '#202020',
            900: '#101010',
        },
    },
    fontSizes: {
        '2xs': RFValue(PixelRatio.getFontScale() * 10, standardScreenHeight),
        xs: RFValue(PixelRatio.getFontScale() * 12, standardScreenHeight),
        sm: RFValue(PixelRatio.getFontScale() * 14, standardScreenHeight),
        md: RFValue(PixelRatio.getFontScale() * 16, standardScreenHeight),
        lg: RFValue(PixelRatio.getFontScale() * 18, standardScreenHeight),
        xl: RFValue(PixelRatio.getFontScale() * 20, standardScreenHeight),
        '2xl': RFValue(PixelRatio.getFontScale() * 24, standardScreenHeight),
        '3xl': RFValue(PixelRatio.getFontScale() * 30, standardScreenHeight),
        '4xl': RFValue(PixelRatio.getFontScale() * 36, standardScreenHeight),
        '5xl': RFValue(PixelRatio.getFontScale() * 48, standardScreenHeight),
        '6xl': RFValue(PixelRatio.getFontScale() * 60, standardScreenHeight),
        '7xl': RFValue(PixelRatio.getFontScale() * 72, standardScreenHeight),
        '8xl': RFValue(PixelRatio.getFontScale() * 96, standardScreenHeight),
        '9xl': RFValue(PixelRatio.getFontScale() * 128, standardScreenHeight),
    },
    components: {
        Text: {
            baseStyle: () => ({
                color: 'white',
            }),
        },
        Heading: {
            baseStyle: () => ({
                color: 'white',
            }),
        },

        Input: {
            baseStyle: () => ({
                backgroundColor: 'white',
            }),
            defaultProps: {
                color: 'gray.500',
                placeholderTextColor: 'gray.100',
            },
        },
    },
    fontConfig: {
        Inter: {
            300: {
                normal: 'Inter_300Light',
            },
            400: {
                normal: 'Inter_400Regular',
            },
            700: {
                normal: 'Inter_700Bold',
            },
        },
    },
    fonts: {
        heading: 'Inter',
        body: 'Inter',
        mono: 'Inter',
    },
    config: {
        // Changing initialColorMode to 'dark'
        //initialColorMode: 'dark',
    },
})
