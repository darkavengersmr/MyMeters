import { makeAutoObservable } from "mobx"
import { IPersonsClass, IUser } from "../models/interfaces"


class Persons implements IPersonsClass {
    data: IUser[] = []
    
    constructor() {
        makeAutoObservable(this)
    }
}

export default new Persons()