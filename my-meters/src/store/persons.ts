import { makeAutoObservable, runInAction } from "mobx"
import { generateUUID, UUIDtoAuth } from "../helpers/helpers"
import { IPerson, IPersonsClass } from "../models/interfaces"
import ApiPersons from "../services/api-persons"

class Persons implements IPersonsClass {
    data: IPerson[] = []
    
    constructor() {
        makeAutoObservable(this)
    }

    init() {        
            ApiPersons.get().then(persons => {
                runInAction(() => {
                    const personsArr = [] 
                    for (let key in persons) {
                        personsArr.push({...persons[key], id: key})                    
                    }
                    if (this.data.length === 0) {
                        this.data = personsArr
                    }      
                })
            })        
        
    }

    getByRoomId(roomId: string): IPerson[] {        
        return this.data.filter(person => person.roomId === roomId && person.isActive)
        
    }

    getById(id: string): IPerson | undefined {                
        return this.data.find(person => person.id === id && person.isActive)
        
    }

    getByRoute(route: string): IPerson | undefined {                      
        return this.data.find(person => person.route === route && person.isActive)        
    }

    async add(person: IPerson): Promise<boolean> {
        const route = generateUUID()
        const credentials = UUIDtoAuth(route)  

        if (await ApiPersons.register(credentials.email, credentials.password)) {
            let id: string
            try {
                id = await ApiPersons.add({...person, route})
            }
            catch {                
                return false                
            }             
            runInAction(() => {                
                this.data.push({...person, id, route})                        
            })
            return true
        }                     
        return false
    }

    async remove(id: string): Promise<boolean> {        
        try {
            const person = this.data.find(person => person.id === id)
            if (person && await ApiPersons.remove(person)) {
                runInAction(() => {   
                    this.data = this.data.map(person => person.id === id ? {...person, isActive: false} : person)                
                })
            } else return false            
        }
        catch {            
            return false
        }        
        return true
    }
    
}

export default new Persons()