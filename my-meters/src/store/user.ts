import { makeAutoObservable, runInAction } from "mobx"
import { IUser, IUserClass, LoginResponseType } from "../models/interfaces"
import { initialUser } from "./mock-data/mock-user"
import ApiUsers from "../services/api-users"

class User implements IUserClass {
    data: IUser = initialUser
    
    constructor() {
        makeAutoObservable(this)
    }

    async login(email: string, password: string): Promise<boolean> {
        
        const user = await ApiUsers.login(email, password) as LoginResponseType

        if (user) {
            runInAction(() => {
                this.data.isAuth = true
                this.data.id = user.localId
                this.data.token = user.idToken
                if (process.env.REACT_APP_ADMIN === user.email) {                    
                    this.data.isAdmin = true
                }                
            })            
            return true
        } else return false
            
    }
    
    set(user: IUser) {
        this.data.username = user.username
        this.data.dateIn = user.dateIn
        this.data.roomId = user.roomId
        this.data.id = user.id
    }
}

export default new User()