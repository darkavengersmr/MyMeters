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
    meters: IMeter[]
}

export interface IRoomsClass {
    data: IRoom[]
    getRooms: () => IRoom[]
    addRoom: (room: IRoom) => void
    removeRoom: (id: string) => boolean
    getMeters: (roomId: string) => IMeter[]
    addMeter: (meter: IMeter, roomId: string) => void
    removeMeter: (meterId: string, roomId: string) => boolean 
    getMetersLastValue: (meterId: string, roomId: string) => {date: string | null, value: number | null} 
}

export interface ISettingsClass {
    theme: string
    getTheme: () => Theme
}