import { Theme } from "@mui/material";

export interface IUser {
    id?: string
    username: string
    token?: string
    isAuth?: boolean
    isAdmin?: boolean
    isActive: boolean
    roomId?: string
    dateIn: string    
}

export interface IUserClass {
    data: IUser    
}

export interface IPersonsClass {
    data: IUser[]
}

export interface IMeterValue {
    date: string
    value: number
    userId: string
}

export interface IMeter {
    id?: string
    title: string
    isActive: boolean
    values?: IMeterValue[]    
}

export interface IRoom {
    id?: string
    title: string
    isActive: boolean
    meters?: IMeter[]
}

export interface IRoomsClass {
    data: IRoom[]
    get: () => IRoom[]
    add: (room: IRoom) => void
    remove: (id: string) => boolean    
}

export interface ISettingsClass {
    theme: string
    getTheme: () => Theme
}