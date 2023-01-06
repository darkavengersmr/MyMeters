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
    set: (user: IUser) => void
}

export interface IPersonsClass {
    data: IPerson[]
    init: () => void
    getByRoomId: (roomId: string) => IPerson[]
    getByRoute: (route: string) => IPerson | undefined
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
    values: IMeterValue[]    
}

export interface IRoom {
    id?: string
    title: string
    isActive: boolean
    meters: IMeter[]
}

export interface IRoomsClass {
    data: IRoom[]
    init: () => void
    getRooms: () => IRoom[]
    getRoomById: (id: string) => IRoom | undefined
    addRoom: (room: IRoom) => Promise<boolean>
    removeRoom: (id: string) => Promise<boolean>
    getMeters: (roomId: string) => IMeter[]
    addMeter: (meter: IMeter, roomId: string, initialValue: number) => void
    removeMeter: (meterId: string, roomId: string) => Promise<boolean>
    getMetersLastValue: (meterId: string, roomId: string) => {date: string | null, value: number | null} 
    setMeterValue: (meterValue: IMeterValue, meterId: string, roomId: string) => Promise<boolean>
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

export abstract class IApiRoomsClass {    
    static get: () => Promise<IRoom[]>
    static add: (room: IRoom) => Promise<string>
    static remove: (room: IRoom) => Promise<boolean>
}

export abstract class IApiMetersClass {        
    static add: (meter: IMeter, roomId: string) => Promise<string>
    static remove: (meter: IMeter, roomId: string) => Promise<boolean>
    static addValue: (meterValue: IMeter, meterId: string, roomId: string) => Promise<string>
}