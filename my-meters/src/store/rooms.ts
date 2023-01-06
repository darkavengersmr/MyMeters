import { makeAutoObservable, runInAction } from "mobx"
import { dateNow } from "../helpers/helpers"
import { IMeter, IMeterValue, IRoom, IRoomsClass } from "../models/interfaces"
import ApiMeters from "../services/api-meters"
import ApiRooms from "../services/api-rooms"
import user from "./user"

class Rooms implements IRoomsClass {
    data: IRoom[] = []
    
    constructor() {
        makeAutoObservable(this)
    }

    init() {
        if (this.data.length === 0) {
            ApiRooms.get().then(rooms => {
                runInAction(() => {  
                    for (let keyRoom in rooms) {
                        if (rooms[keyRoom].meters) {
                            let newMeters = []
                            for (let keyMeter in rooms[keyRoom].meters) {
                                if (rooms[keyRoom].meters[keyMeter].values) {
                                    let newValues = []
                                    for (let keyValue in rooms[keyRoom].meters[keyMeter].values) {
                                        newValues.push({...rooms[keyRoom].meters[keyMeter].values[keyValue]})
                                    }
                                    newMeters.push({...rooms[keyRoom].meters[keyMeter], id: keyMeter, values: newValues})
                                } else {
                                    newMeters.push({...rooms[keyRoom].meters[keyMeter], id: keyMeter, values: []})
                                }                                
                            }
                            this.data.push({...rooms[keyRoom], id: keyRoom, meters: newMeters})
                        } else {
                            this.data.push({...rooms[keyRoom], id: keyRoom, meters: []})
                        }                        
                    }                    
                })
            })
        }        
    }

    getRooms(): IRoom[] {                
        return this.data.filter(room => room.isActive)        
    }    

    getRoomById(id: string): IRoom | undefined {        
        return this.data.find(room => room.id === id && room.isActive)
        
    } 

    async addRoom(room: IRoom): Promise<boolean> {
        let id: string
        try {
            id = await ApiRooms.add(room)
        }
        catch {                
            return false                
        }                     
        runInAction(() => {                
            this.data.push({...room, id})            
        })
        return true                
    }

    async removeRoom(id: string): Promise<boolean> {
        try {
            const room = this.data.find(room => room.id === id)
            if (room && await ApiRooms.remove(room)) {
                runInAction(() => {                       
                    this.data = this.data.map(room => room.id === id ? {...room, isActive: false} : room)                
                })
            } else return false            
        }
        catch {            
            return false
        }        
        return true
    }

    getMeters(roomId: string): IMeter[] {                       
        return this.data.find(room => room.id === roomId)!.meters.filter(meter => meter.isActive)
    }

    async addMeter(meter: IMeter, roomId: string, initialValue: number) {
        let id: string
        try {
            id = await ApiMeters.add(meter, roomId)
            await this.setMeterValue(
                {
                    date: dateNow(),
                    value: initialValue,
                    userId: user.data.id!
                }, id, roomId)
        }
        catch {                
            return false                
        }                     
        runInAction(() => {                
            this.data = this.data.map(room => {                        
                if (room.id === roomId) {                    
                    const newMeters = [...room.meters, {...meter, id, values: [{date: dateNow(), value: initialValue, userId: user.data.id!}]}]
                    return {...room, meters: newMeters}
                } else return room
            })           
        })
        return true
    }

    async removeMeter(meterId: string, roomId: string): Promise<boolean> {
        const meter = this.getMeters(roomId).find(meter => meter.id === meterId)
        try {            
            if (meter && await ApiMeters.remove(meter, roomId)) {
                runInAction(() => {                       
                    this.data = this.data.map(room => {                        
                        if (room.id === roomId) {
                            const newMeters = room.meters.map(meter => meter.id === meterId ? {...meter, isActive: false} : meter)
                            return {...room, meters: newMeters}
                        } else return room
                    })            
                })
            } else return false            
        }
        catch {            
            return false
        }        
        return true
    }
    
    getMetersLastValue(meterId: string, roomId: string): {date: string | null, value: number | null} {         
        const values = this.data.find(room => room.id === roomId)?.meters?.find(meter => meter.id === meterId)?.values 
        if (values && values.length > 0) {
            return { date: values[values.length-1].date, value: values[values.length-1].value}
        } else return { date: null, value: null}
    }

    async setMeterValue(meterValue: IMeterValue, meterId: string, roomId: string): Promise<boolean> {
        try {
            const id = await ApiMeters.addValue(meterValue, meterId, roomId)
            runInAction(() => {
                let room = this.data.find(room => room.id === roomId)
                if (room) {
                    let meter = room.meters.find(meter => meter.id === meterId)
                    if (meter) {
                        meter.values?.push(meterValue)
                        this.data = [...this.data, {...room, meters: [...room.meters, meter]}]                         
                    }
                }    
            })
        }
        catch {                
            return false                
        }                     
        return true            
    }

}

export default new Rooms()