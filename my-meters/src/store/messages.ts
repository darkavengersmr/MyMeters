import { makeAutoObservable, runInAction } from "mobx"
import { dateNow } from "../helpers/helpers"
import { IMessage, IMessagesClass } from "../models/interfaces"
import ApiMessages from "../services/api-messages"

class Messages implements IMessagesClass {
    data: IMessage[] = []
    
    constructor() {
        makeAutoObservable(this)
    }

    async getMessages(userId: string): Promise<IMessage[]> {        
        if (this.data.length === 0) {
            const messagesArr: IMessage[] = [] 
            await ApiMessages.get(userId).then(messages => {                
                for (let key in messages) {
                    messagesArr.push({...messages[key], id: key})                    
                }
                runInAction(() => {
                    this.data = messagesArr                      
                })    
                
            })
            return messagesArr
        } else return this.data        
    }    

    async getAllMessages(): Promise<IMessage[]> {        
        if (this.data.length === 0) {
            const messagesArr: IMessage[] = [] 
            await ApiMessages.getAll().then(users => {                                
                for (let userId in users) {
                    for (let messageId in users[userId]) {
                        messagesArr.push({...users[userId][messageId], id: messageId})    
                    }                                        
                }
                runInAction(() => {
                    this.data = messagesArr                      
                })    
                
            })
            return messagesArr
        } else return this.data        
    }

    sendToday(): boolean {        
        if (this.data.find(message => message.date === dateNow())) return true
        else return false
    }

    async addMessage(message: IMessage, userId: string): Promise<boolean> {
        let id: string
        try {
            id = await ApiMessages.add(message, userId)
            if (!id) return false
        }
        catch {                
            return false                
        }                     
        runInAction(() => {                
            this.data.push({...message, id})            
        })
        return true                
    }

    async removeMessage(id: string, userId: string): Promise<boolean> {
        try {
            const message = this.data.find(message => message.id === id)
            if (message && await ApiMessages.remove(message, userId)) {
                runInAction(() => {                       
                    this.data = this.data.map(message => message.id === id ? {...message, isActive: false} : message)                
                })
            } else return false            
        }
        catch {            
            return false
        }        
        return true
    }

    async replyToMessage(message: IMessage): Promise<boolean> {             
        try {
            if (!await ApiMessages.update(message)) return false
        }
        catch {                
            return false                
        }                     
        runInAction(() => {                
            this.data = this.data.map(mes => mes.id === message.id ? message : mes)            
        })
        return true
    }

}

export default new Messages()