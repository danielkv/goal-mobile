import { IUser } from '@models/user'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'

import { pick } from 'radash'
import { create } from 'zustand'

export interface UserContextCredentials {
    sessionCookie: string
    userId: string
    email: string
}

export interface UserContext {
    user: IUser | null
    serUser(user: IUser | null): void
}

export const useUserContext = create<UserContext>((set) => ({
    user: null,
    serUser(user: IUser | null) {
        set({ user })
    },
}))

export const setLoggedUser = (user: IUser | null): void => {
    useUserContext.getState().serUser(user)
}

export const useLoggedUser = (): IUser | null => {
    return useUserContext((c) => c.user)
}

export function extractUserCredential(user: FirebaseAuthTypes.User): IUser {
    const credential = pick(user, ['uid', 'email', 'emailVerified', 'displayName', 'photoURL', 'phoneNumber'])

    return {
        ...credential,
        displayName: credential.displayName || '',
        phoneNumber: credential.phoneNumber || '',
        email: credential.email || '',
    }
}
