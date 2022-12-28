import { makeAutoObservable } from "mobx"
import { IUser, IUserClass } from "../models/interfaces"
import { initialUser } from "./mock-data/mock-user"

class User implements IUserClass {
    data: IUser = initialUser
    
    constructor() {
        makeAutoObservable(this)
    }
}

export default new User()