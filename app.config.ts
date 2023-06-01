import dotenv from 'dotenv'
import { ConfigContext, ExpoConfig } from 'expo/config'

dotenv.config()

export default ({ config }: ConfigContext): ExpoConfig => {
    return {
        ...config,
        owner: 'goal',
        name: 'My Goal',
        slug: 'goal-mobile',
        version: '1.1.0',
        icon: './src/assets/icon.png',
        userInterfaceStyle: 'dark',
        splash: {
            image: './src/assets/splash.png',
            resizeMode: 'cover',
            backgroundColor: '#202020',
        },
        assetBundlePatterns: ['./src/**/*'],
        ios: {
            buildNumber: '6',
            bundleIdentifier: 'app.mygoal.goal',
            supportsTablet: false,
            requireFullScreen: true,
            googleServicesFile: './GoogleService-Info.plist',
        },
        android: {
            versionCode: 3,
            package: 'app.mygoal.goal',
            adaptiveIcon: {
                foregroundImage: './src/assets/adaptive-icon.png',
                backgroundColor: '#202020',
            },
            googleServicesFile: './google-services.json',
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
            '@react-native-firebase/app',
            '@react-native-firebase/perf',
            '@react-native-firebase/crashlytics',
            '@react-native-firebase/auth',
            [
                'expo-screen-orientation',
                {
                    initialOrientation: 'PORTRAIT',
                },
            ],
            [
                'expo-build-properties',
                {
                    ios: {
                        useFrameworks: 'static',
                    },
                },
            ],
        ],
    }
}
