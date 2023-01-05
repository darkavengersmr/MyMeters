import { IUser } from "../../models/interfaces"

export const initialUser: IUser = {
    id: 'admin',
    username: 'admin',
    token: '',
    isAuth: false,
    isAdmin: true,
    isActive: true,    
    dateIn: "2018-10-10",
}