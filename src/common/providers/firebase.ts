import { Alert } from 'react-native'

import Constants from 'expo-constants'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFunctions, httpsCallable } from 'firebase/functions'

class FirebaseProvider {
    private app: FirebaseApp | null = null

    getApp() {
        try {
            if (this.app) return this.app

            this.app = initializeApp({
                apiKey: Constants.expoConfig?.extra?.APIKEY,
                authDomain: Constants.expoConfig?.extra?.AUTHDOMAIN,
                projectId: Constants.expoConfig?.extra?.PROJECTID,
                storageBucket: Constants.expoConfig?.extra?.STORAGEBUCKET,
                messagingSenderId: Constants.expoConfig?.extra?.MESSAGINGSENDERID,
                appId: Constants.expoConfig?.extra?.APPID,
                measurementId: Constants.expoConfig?.extra?.MEASUREMENTID,
            })

            return this.app
        } catch (err) {
            Alert.alert('Ocorreu um erro ao inicialiar a conexão com o Banco de dados')
        }
    }

    getAuth() {
        const app = this.getApp()
        if (!app) throw new Error('Provedor de requisições não conectado')

        return getAuth(app)
    }

    getFunctions() {
        const app = this.getApp()
        if (!app) throw new Error('Provedor de requisições não conectado')

        return getFunctions(app)
    }

    FUNCTION_CALL<RequestData = unknown, ResponseData = unknown>(fnName: string) {
        const functions = this.getFunctions()
        if (!functions) throw new Error('Provedor de requisições não conectado')

        return httpsCallable<RequestData, ResponseData>(functions, fnName)
    }
    //
}

export const firebaseProvider = new FirebaseProvider()
