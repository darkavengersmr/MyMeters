import { makeAutoObservable } from "mobx"
import { generateUUID } from "../helpers/helpers"
import { IPerson, IPersonsClass } from "../models/interfaces"
import { initialPersons } from "./mock-data/mock-persons"


class Persons implements IPersonsClass {
    data: IPerson[] = initialPersons
    
    constructor() {
        makeAutoObservable(this)
    }

    getByRoomId(roomId: string): IPerson[] {                
        return this.data.filter(person => person.roomId === roomId && person.isActive)
    }

    add(person: IPerson) {
        const uuid = generateUUID()        
        this.data.push({...person, id: this.data.length.toString(), route: uuid})
    }

    remove(id: string): boolean {
        this.data = this.data.map(person => person.id === id ? {...person, isActive: false} : person)
        return true
    }
    
}

export default new Persons()