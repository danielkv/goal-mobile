import { getEnv } from '@utils/getEnv'
import { initializeApp } from 'firebase/app'
import { ProviderId, browserSessionPersistence, getAuth } from 'firebase/auth'
import { getFunctions, httpsCallable } from 'firebase/functions'

export const FIREBASE_APP = initializeApp({
    apiKey: getEnv('APIKEY'),
    authDomain: getEnv('AUTHDOMAIN'),
    projectId: getEnv('PROJECTID'),
    storageBucket: getEnv('STORAGEBUCKET'),
    messagingSenderId: getEnv('MESSAGINGSENDERID'),
    appId: getEnv('APPID'),
    measurementId: getEnv('MEASUREMENTID'),
})

export const FIREBASE_AUTH = getAuth(FIREBASE_APP)

export const FUNCTIONS = getFunctions(FIREBASE_APP)

export const signInOptions = [
    {
        provider: ProviderId.PASSWORD,
        fullLabel: 'Login',
        disableSignUp: { status: true },
    },
]

export const FUNCTION_CALL = <RequestData = unknown, ResponseData = unknown>(fnName: string) =>
    httpsCallable<RequestData, ResponseData>(FUNCTIONS, fnName)
