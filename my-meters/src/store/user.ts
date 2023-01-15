import { makeAutoObservable, runInAction } from "mobx"
import { IUser, IUserClass, LoginResponseType, RefreshTokenResponseType } from "../models/interfaces"
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
                localStorage.setItem('my_meter_refresh_token', user.refreshToken)
                localStorage.setItem('my_meter_email', user.email)
                if (process.env.REACT_APP_ADMIN === user.email) {                    
                    this.data.isAdmin = true
                }                
            })            
            return true
        } else return false
            
    }
    
    async loginWithToken(refreshToken: string): Promise<boolean> {
        
        const user = await ApiUsers.refreshTokenToTokenId(refreshToken) as RefreshTokenResponseType

        if (user) {
            runInAction(() => {            
                this.data.isAuth = true
                this.data.id = user.user_id
                this.data.token = user.id_token          
                if (user.refresh_token) localStorage.setItem('my_meter_refresh_token', user.refresh_token)
                if (process.env.REACT_APP_ADMIN === localStorage.getItem('my_meter_email')) {                    
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