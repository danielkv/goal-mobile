import Constants from 'expo-constants'

export function getEnv<T = string>(key: string, defaultValue?: T): T {
    const value = Constants.expoConfig?.extra?.[key]

    if (value) return value as T

    if (defaultValue) return defaultValue

    throw new Error(`Variável de ambiente '${key}' não tem valor definido ou não existe`)
}
