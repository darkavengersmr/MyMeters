import { IUser } from "../../models/interfaces"

export const initialUser: IUser = {
    id: 'admin',
    username: 'adminS',
    token: '',
    isAuth: true,
    isAdmin: true,
    isActive: true,    
    dateIn: new Date(2018, 10, 10, 0, 0, 0, 0),
}