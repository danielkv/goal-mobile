export interface IUserInput {
    displayName: string
    phoneNumber: string
    email: string
    password: string
    subscription?: IUserSubscription
}

export interface IUserSubscription {
    name: string
    active: boolean
}

export interface IUser {
    uid: string
    displayName: string
    email: string
    subscription?: IUserSubscription
}
