import { IUser } from "../../models/interfaces"

export const initialUser: IUser[] = [
    {
        id: 'user1',
        username: 'user1',
        token: '',
        isAuth: true,
        isAdmin: true,
        isActive: true,    
        dateIn: "2018-10-10",
    },
    {
        id: 'user2',
        username: 'user2',
        token: '',
        isAuth: true,
        isAdmin: false,
        isActive: true,    
        dateIn: "2020-10-10",
    },
]