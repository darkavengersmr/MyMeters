export interface IUser {
    id: string
    username: string
    token?: string
    isAuth?: boolean
    isAdmin?: boolean
    isActive: boolean
    roomId?: string
    dateIn: Date    
}

export interface IUserClass {
    data: IUser    
}

export interface IPersonsClass {
    data: IUser[]
}

export interface IMeterValue {
    date: Date
    value: number
    userId: string
}

export interface IMeter {
    id: string
    title: string
    isActive: boolean
    values?: IMeterValue[]    
}

export interface IRoom {
    id: string
    title: string
    isActive: boolean
    meters?: IMeter[]
}

export interface IRoomsClass {
    data: IRoom[]
}
