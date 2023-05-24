import { User } from 'firebase/auth'

export interface IUserInput {
    displayName: string
    phoneNumber: string
    email: string
    password: string
}

export interface IUser extends User {
    email: string
}
