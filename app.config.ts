import 'dotenv/config'
import { ConfigContext, ExpoConfig } from 'expo/config'

export default ({ config }: ConfigContext): ExpoConfig => {
    return {
        ...config,
        owner: 'goal',
        name: 'Goal',
        slug: 'goal-mobile',
        version: '1.0.3',
        icon: './src/assets/icon.png',
        userInterfaceStyle: 'dark',
        splash: {
            image: './src/assets/splash.png',
            resizeMode: 'cover',
            backgroundColor: '#202020',
        },
        assetBundlePatterns: ['**/*'],
        ios: {
            buildNumber: '3',
            bundleIdentifier: 'app.mygoal.goal',
            supportsTablet: true,
            requireFullScreen: true,
        },
        android: {
            versionCode: 2,
            package: 'app.mygoal.goal',
            adaptiveIcon: {
                foregroundImage: './src/assets/adaptive-icon.png',
                backgroundColor: '#202020',
            },
        },

        extra: {
            APIKEY: process.env.APIKEY,
            AUTHDOMAIN: process.env.AUTHDOMAIN,
            PROJECTID: process.env.PROJECTID,
            STORAGEBUCKET: process.env.STORAGEBUCKET,
            MESSAGINGSENDERID: process.env.MESSAGINGSENDERID,
            APPID: process.env.APPID,
            MEASUREMENTID: process.env.MEASUREMENTID,
            WEB_APP_URL: process.env.WEB_APP_URL,
            WEB_APP_RESET_PASSWORD_URL: process.env.WEB_APP_RESET_PASSWORD_URL,
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
