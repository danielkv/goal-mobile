import * as dotenv from 'dotenv'
import { ConfigContext, ExpoConfig } from 'expo/config'

const envs = dotenv.config({ path: './.env' })

export default ({ config }: ConfigContext): ExpoConfig => {
    return {
        ...config,
        name: 'goal-mobile',
        slug: 'goal-mobile',
        version: '1.0.0',
        orientation: 'portrait',
        icon: './src/assets/icon.png',
        userInterfaceStyle: 'dark',
        splash: {
            image: './src/assets/splash.png',
            resizeMode: 'contain',
            backgroundColor: '#ffffff',
        },
        assetBundlePatterns: ['**/*'],
        ios: {
            supportsTablet: true,
        },
        android: {
            adaptiveIcon: {
                foregroundImage: './src/assets/adaptive-icon.png',
                backgroundColor: '#ffffff',
            },
        },
        web: {
            favicon: './assets/favicon.png',
        },

        extra: {
            ...envs.parsed,
            eas: {
                projectId: 'ed242d48-5e82-4082-8477-7e5aea15b1d7',
            },
        },

        updates: {
            url: 'https://u.expo.dev/ed242d48-5e82-4082-8477-7e5aea15b1d7',
        },
        runtimeVersion: {
            policy: 'sdkVersion',
        },
    }
}
