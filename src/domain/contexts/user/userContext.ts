import { IUser } from '@models/user'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { create } from 'zustand'

export interface UserContextCredentials {
    sessionCookie: string
    userId: string
    email: string
}

export interface UserContext {
    credentials: UserContextCredentials | null
    user: IUser | null
    serUser(user: IUser | null): void
    setCredentials(newCredentials: UserContextCredentials | null): void
}

const USER_CONTEXT_STORAGE_KEY = '@goal/UserContext'

export const useUserContext = create<UserContext>((set) => ({
    credentials: null,
    user: null,
    serUser(user: IUser | null) {
        set({ user })
    },
    setCredentials(newCredentials: UserContextCredentials | null): void {
        set({ credentials: newCredentials })
    },
}))

export const setUserCredentials = (credentials: UserContextCredentials | null): void => {
    useUserContext.getState().setCredentials(credentials)
}
export const setLoggedUser = (user: IUser | null): void => {
    useUserContext.getState().serUser(user)
}

export function saveLocalUserCredentials(context: UserContextCredentials) {
    const data = JSON.stringify(context)
    return AsyncStorage.setItem(USER_CONTEXT_STORAGE_KEY, data)
}

export async function getLocalUserCredentials(): Promise<UserContextCredentials | null> {
    const data = await AsyncStorage.getItem(USER_CONTEXT_STORAGE_KEY)
    if (!data) return null

    return JSON.parse(data) as UserContextCredentials
}

export async function removeLocalUserCredentials(): Promise<void> {
    await AsyncStorage.removeItem(USER_CONTEXT_STORAGE_KEY)
}
