import { makeAutoObservable } from "mobx"
import { IRoom, IRoomsClass } from "../models/interfaces"
import { initialRooms } from "./mock-data/mock-rooms"

class Rooms implements IRoomsClass {
    data: IRoom[] = initialRooms
    
    constructor() {
        makeAutoObservable(this)
    }

    get() {
        return this.data.filter(room => room.isActive)
    }

    add(room: IRoom) {
        this.data.push({...room, id: this.data.length.toString()})        
    }

    remove(id: string): boolean {
        this.data = this.data.map(room => room.id === id ? {...room, isActive: false} : room)
        return true
    }

    
}

export default new Rooms()