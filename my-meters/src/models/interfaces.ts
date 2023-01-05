import { Theme } from "@mui/material";

export interface IUser {
    id?: string
    username: string
    token?: string
    isAuth?: boolean
    isAdmin?: boolean
    isActive: boolean    
    dateIn: string    
}

export interface IPerson {
    id?: string
    username: string
    route: string    
    isActive: boolean
    roomId?: string
    dateIn: string    
}

export interface IUserClass {
    data: IUser 
    login: (email: string, password: string) => Promise<boolean>
}

export interface IPersonsClass {
    data: IPerson[]
    init: () => void
    getByRoomId: (roomId: string) => IPerson[]
    add: (person: IPerson) => Promise<boolean>
    remove: (id: string) => Promise<boolean>
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

export interface LoginResponseType {
    localId: string
    email: string
    displayName: string
    idToken: string
    registered: boolean
    refreshToken: string
    expiresIn: string
    error?: any
  }

export interface ResponseDataType {
    name?: string
    error?: string
}


export abstract class IApiUsersClass {
    static login: (email: string, password: string) => Promise<LoginResponseType | boolean>
}

export abstract class IApiPersonsClass {
    static register: (email: string, password: string) => Promise<boolean>
    static get: () => Promise<IPerson[]>
    static add: (person: IPerson) => Promise<string>
    static remove: (person: IPerson) => Promise<boolean>
}