import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'

export interface UserContext {
    token: string
    userId: string
    name: string
}

const USER_CONTEXT_STORAGE_KEY = '@goal/UserContext'

export const useUserContext = create<UserContext | null>(() => null)

export const setUserContext = (context: UserContext | null): void => {
    useUserContext.setState(context)
}

export function saveLocalUserContext(context: UserContext) {
    const data = JSON.stringify(context)
    return AsyncStorage.setItem(USER_CONTEXT_STORAGE_KEY, data)
}

export async function getLocalUserContext(): Promise<UserContext | null> {
    const data = await AsyncStorage.getItem(USER_CONTEXT_STORAGE_KEY)
    if (!data) return null

    return JSON.parse(data) as UserContext
}

export async function removeLocalUserContext(): Promise<void> {
    await AsyncStorage.removeItem(USER_CONTEXT_STORAGE_KEY)
}
