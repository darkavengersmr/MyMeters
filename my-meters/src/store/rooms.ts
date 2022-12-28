import { makeAutoObservable } from "mobx"
import { IRoom, IRoomsClass } from "../models/interfaces"
import { initialRooms } from "./mock-data/mock-rooms"

class Rooms implements IRoomsClass {
    data: IRoom[] = initialRooms
    
    constructor() {
        makeAutoObservable(this)
    }
}

export default new Rooms()