import { makeAutoObservable } from "mobx"
import { IMeter, IRoom, IRoomsClass } from "../models/interfaces"
import { initialRooms } from "./mock-data/mock-rooms"

class Rooms implements IRoomsClass {
    data: IRoom[] = initialRooms
    
    constructor() {
        makeAutoObservable(this)
    }

    getRooms(): IRoom[] {
        return this.data.filter(room => room.isActive)
    }    

    addRoom(room: IRoom) {
        this.data.push({...room, id: this.data.length.toString()})        
    }

    removeRoom(id: string): boolean {
        this.data = this.data.map(room => room.id === id ? {...room, isActive: false} : room)
        return true
    }

    getMeters(roomId: string): IMeter[] {                    
        return this.data.find(room => room.id === roomId)!.meters.filter(meter => meter.isActive)
    }

    addMeter(meter: IMeter, roomId: string) {
        this.data = this.data.map(room => {                        
            if (room.id === roomId) {                
                const newMeters = [...room.meters, {...meter, id: room.meters.length.toString()}]
                return {...room, meters: newMeters}
            } else return room
        })        
    }

    removeMeter(meterId: string, roomId: string): boolean {
        this.data = this.data.map(room => {                        
            if (room.id === roomId) {
                const newMeters = room.meters.map(meter => meter.id === meterId ? {...meter, isActive: false} : meter)
                return {...room, meters: newMeters}
            } else return room
        })
        return true
    }
    
    getMetersLastValue(meterId: string, roomId: string): {date: string | null, value: number | null} {         
        const values = this.data.find(room => room.id === roomId)?.meters?.find(meter => meter.id === meterId)?.values        
        if (values && values.length > 0) {
            return { date: values[values.length-1].date, value: values[values.length-1].value}
        } else return { date: null, value: null}
    }

}

export default new Rooms()