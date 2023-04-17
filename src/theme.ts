import { extendTheme } from 'native-base'

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
            100: '#999999',
            300: '#323232',
            500: '#262626',
            700: '#202020',
            900: '#101010',
        },
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
