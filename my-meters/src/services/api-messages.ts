import { IApiMessagesClass, IMessage, ResponseDataType } from "../models/interfaces";
import user from "../store/user";
import system from "../store/system";

export default class ApiMessages implements IApiMessagesClass {    

    static async get(userId: string, id?: string): Promise<{[key: string]: IMessage}> {
        system.setShowSpinner(true)                    
        let responseData: {[key: string]: IMessage} | IMessage
                    
        const params = new URLSearchParams(`auth=${user.data.token}`)

        const response = await fetch(`${process.env.REACT_APP_DATABASEURL}/messages/${userId}/${id ? '/'+id : ''}.json?` + params, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            
        },        
        });

        if (id) {
            responseData = await response.json() as IMessage
            system.setShowSpinner(false) 
            return {[id]: responseData}
        } else {
            responseData = await response.json() as {[key: string]: IMessage}
            system.setShowSpinner(false) 
            return responseData
        }
        
    }

    static async getAll(): Promise<{[key: string]: {[key: string]: IMessage}}> {
        system.setShowSpinner(true)                    
        let responseData: {[key: string]: {[key: string]: IMessage}}
                    
        const params = new URLSearchParams(`auth=${user.data.token}`)

        const response = await fetch(`${process.env.REACT_APP_DATABASEURL}/messages.json?` + params, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            
        },        
        });
        
        responseData = await response.json() as {[key: string]: {[key: string]: IMessage}}
        system.setShowSpinner(false)         
        return responseData
        
    }

    static async add(message: IMessage, userId: string): Promise<string> { 
        system.setShowSpinner(true)       
        let responseData: ResponseDataType
                    
        const params = new URLSearchParams(`auth=${user.data.token}`)

        const response = await fetch(`${process.env.REACT_APP_DATABASEURL}/messages/${userId}.json?` + params, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            
        },           
        body: JSON.stringify(message) 
        });

        responseData = await response.json() as ResponseDataType
        system.setShowSpinner(false)        
        if (responseData.error) throw new Error('Message add error')
        else return responseData.name!
    }

    static async remove(message: IMessage, userId: string): Promise<boolean> {                                
        system.setShowSpinner(true)
        const params = new URLSearchParams(`auth=${user.data.token}`)
        const {id} = message
        try {
            const response = await fetch(`${process.env.REACT_APP_DATABASEURL}/messages/${userId}/${id}/isActive.json?` + params, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                    
                },           
                body: JSON.stringify(false) 
                });
            system.setShowSpinner(false)
            if (response.status === 200) return true
            else return false
        }
        catch {
            return false
        }                
    }

    static async update(message: IMessage): Promise<string> { 
        system.setShowSpinner(true)       
        let responseData: ResponseDataType
        const {id, userId} = message
                    
        const params = new URLSearchParams(`auth=${user.data.token}`)

        const response = await fetch(`${process.env.REACT_APP_DATABASEURL}/messages/${userId}/${id}.json?` + params, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json',
            
        },           
        body: JSON.stringify(message) 
        });

        responseData = await response.json() as ResponseDataType
        system.setShowSpinner(false)        
        if (responseData.error) throw new Error('Message update error')
        else return responseData.name!
    }
}

