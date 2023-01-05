import { IApiPersonsClass, IPerson, ResponseDataType } from "../models/interfaces";
import user from "../store/user";

export default class ApiPersons implements IApiPersonsClass{    
    static async register(email: string, password: string): Promise<boolean> {
        
        try {
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_APIKEY}`, {
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
            return false
        }
        return true        
    }

    static async get(): Promise<IPerson[]> {        
        let responseData: IPerson[]
                    
        const params = new URLSearchParams(`auth=${user.data.token}`)

        const response = await fetch(`${process.env.REACT_APP_DATABASEURL}/persons.json?` + params, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            
        },        
        });

        responseData = await response.json() as IPerson[]        
        return responseData
    }

    static async add(person: IPerson): Promise<string> {        
        let responseData: ResponseDataType
                    
        const params = new URLSearchParams(`auth=${user.data.token}`)

        const response = await fetch(`${process.env.REACT_APP_DATABASEURL}/persons.json?` + params, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            
        },           
        body: JSON.stringify(person) 
        });

        responseData = await response.json() as ResponseDataType        
        if (responseData.error) throw new Error('Person add error')
        else return responseData.name!
    }

    static async remove(person: IPerson): Promise<boolean> {                                
        const params = new URLSearchParams(`auth=${user.data.token}`)         
        try {
            const response = await fetch(`${process.env.REACT_APP_DATABASEURL}/persons/${person.id}.json?` + params, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                    
                },           
                body: JSON.stringify({...person, isActive: false}) 
                });
            if (response.status === 200) return true
            else return false
        }
        catch {
            return false
        }                
    }
}

