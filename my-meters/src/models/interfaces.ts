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
    loginWithToken: (refreshToken: string) => Promise<boolean>
    set: (user: IUser) => void
}

export interface IPersonsClass {
    data: IPerson[]
    init: () => void
    getById: (id: string) => IPerson | undefined 
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
    getTheme: () => Theme
    setTheme: (theme: 'dark' | 'light') => void
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

export interface RefreshTokenResponseType {
    expires_in: string
    token_type: string
    refresh_token:	string
    id_token: string
    user_id: string
    project_id: string
    error?: any
}


export interface ResponseDataType {
    name?: string
    error?: string
}

export abstract class IApiUsersClass {
    static login: (email: string, password: string) => Promise<LoginResponseType | boolean>
    static refreshTokenToTokenId: (refreshToken: string) => Promise<RefreshTokenResponseType | boolean>
}

export abstract class IApiPersonsClass {
    static register: (email: string, password: string) => Promise<boolean>
    static get: () => Promise<{[key: string]: IPerson}>
    static add: (person: IPerson) => Promise<string>
    static remove: (person: IPerson) => Promise<boolean>
}

export abstract class IApiRoomsClass {    
    static get: () => Promise<{[key: string]: IRoom}>
    static add: (room: IRoom) => Promise<string>
    static remove: (room: IRoom) => Promise<boolean>
}

export abstract class IApiMetersClass {        
    static add: (meter: IMeter, roomId: string) => Promise<string>
    static remove: (meter: IMeter, roomId: string) => Promise<boolean>
    static addValue: (meterValue: IMeter, meterId: string, roomId: string) => Promise<string>
}

export interface IMessage {
    id?: string
    date: string
    message: string
    userId: string
    username: string
    isActive: boolean
    reply?: string
}

export abstract class IApiMessagesClass {    
    static get: (userId: string, id?: string) => Promise<{[key: string]: IMessage}>
    static getAll: () => Promise<{[key: string]: {[key: string]: IMessage}}>
    static add: (message: IMessage, userId?: string) => Promise<string>
    static remove: (message: IMessage, userId?: string) => Promise<boolean>
    static update: (message: IMessage) => Promise<string>
}

export interface IMessagesClass {
    data: IMessage[]    
    //init: (userId: string) => void
    getMessages: (userId: string) => Promise<IMessage[]>
    getAllMessages: () => Promise<IMessage[]>
    //getMessageById: (id: string) => IMessage | undefined
    sendToday: () => boolean
    addMessage: (message: IMessage, userId: string) => Promise<boolean>
    removeMessage: (id: string, userId: string) => Promise<boolean>
    replyToMessage: (message: IMessage) => Promise<boolean>    
}