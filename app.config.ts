import * as dotenv from 'dotenv'
import { ConfigContext, ExpoConfig } from 'expo/config'

const envs = dotenv.config({ path: './.env' })

export default ({ config }: ConfigContext): ExpoConfig => {
    return {
        ...config,
        owner: 'goal',
        name: 'goal-mobile',
        slug: 'goal-mobile',
        version: '1.0.0',
        icon: './src/assets/icon.png',
        userInterfaceStyle: 'dark',
        splash: {
            image: './src/assets/splash.png',
            resizeMode: 'cover',
            backgroundColor: '#202020',
        },
        assetBundlePatterns: ['**/*'],
        ios: {
            supportsTablet: true,
            requireFullScreen: true,
        },
        android: {
            adaptiveIcon: {
                foregroundImage: './src/assets/adaptive-icon.png',
                backgroundColor: '#202020',
            },
        },

        extra: {
            ...envs.parsed,
            eas: {
                projectId: 'a5ca3be7-cbb0-4f41-aa54-d96bc45da066',
            },
        },

        updates: {
            url: 'https://u.expo.dev/a5ca3be7-cbb0-4f41-aa54-d96bc45da066',
        },

        runtimeVersion: {
            policy: 'sdkVersion',
        },
        plugins: [
            [
                'expo-screen-orientation',
                {
                    initialOrientation: 'PORTRAIT',
                },
            ],
        ],
    }
}
