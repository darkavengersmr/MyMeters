import { IApiPersonsClass, IPerson, ResponseDataType } from "../models/interfaces";
import system from "../store/system";
import user from "../store/user";

export default class ApiPersons implements IApiPersonsClass{    
    static async register(email: string, password: string): Promise<boolean> {
        system.setShowSpinner(true)
        try {
            await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_APIKEY}`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'              
            },            
            body: JSON.stringify({
                email, 
                password,
                returnSecureToken: true
            }) 
          });
        }
        catch {
            system.sendNotification('Сетевая ошибка, попробуйте позднее', 'error')
            system.setShowSpinner(false)
            return false
        }
        system.setShowSpinner(false)
        return true        
    }

    static async get(): Promise<{[key: string]: IPerson}> { 
        system.setShowSpinner(true)       
        let responseData: {[key: string]: IPerson}  
                    
        const params = new URLSearchParams(`auth=${user.data.token}`)

        const response = await fetch(`${process.env.REACT_APP_DATABASEURL}/persons.json?` + params, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            
        },        
        });

        responseData = await response.json() as {[key: string]: IPerson} 
        system.setShowSpinner(false)    
        return responseData
    }

    static async add(person: IPerson): Promise<string> {
        system.setShowSpinner(true)        
        let responseData: ResponseDataType = {}
        
        try {
            const params = new URLSearchParams(`auth=${user.data.token}`)

            const response = await fetch(`${process.env.REACT_APP_DATABASEURL}/persons.json?` + params, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                
            },           
            body: JSON.stringify(person) 
            });

            responseData = await response.json() as ResponseDataType
            system.setShowSpinner(false)
            return responseData.name! 
        }
        catch {
            system.setShowSpinner(false)
            system.sendNotification('Сетевая ошибка, попробуйте позднее', 'error')       
            return ''      
        }        
    }

    static async remove(person: IPerson): Promise<boolean> { 
        system.setShowSpinner(true)                               
        const params = new URLSearchParams(`auth=${user.data.token}`)
        const {id, ...rest} = person
        try {
            const response = await fetch(`${process.env.REACT_APP_DATABASEURL}/persons/${id}.json?` + params, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                    
                },           
                body: JSON.stringify({...rest, isActive: false}) 
                });
            system.setShowSpinner(false)
            if (response.status === 200) return true
            else return false
        }
        catch {
            system.setShowSpinner(false)
            system.sendNotification('Сетевая ошибка, попробуйте позднее', 'error')
            return false
        }                
    }
}

