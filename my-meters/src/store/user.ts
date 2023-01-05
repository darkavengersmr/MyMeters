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
            })            
            return true
        } else return false
            
    }

    
}

export default new User()