import { IApiRoomsClass, IRoom, ResponseDataType } from "../models/interfaces";
import user from "../store/user";

export default class ApiRooms implements IApiRoomsClass{    

    static async get(): Promise<IRoom[]> {        
        let responseData: IRoom[]
                    
        const params = new URLSearchParams(`auth=${user.data.token}`)

        const response = await fetch(`${process.env.REACT_APP_DATABASEURL}/rooms.json?` + params, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
            
        },        
        });

        responseData = await response.json() as IRoom[]        
        return responseData
    }

    static async add(room: IRoom): Promise<string> {        
        let responseData: ResponseDataType
                    
        const params = new URLSearchParams(`auth=${user.data.token}`)

        const response = await fetch(`${process.env.REACT_APP_DATABASEURL}/rooms.json?` + params, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            
        },           
        body: JSON.stringify(room) 
        });

        responseData = await response.json() as ResponseDataType        
        if (responseData.error) throw new Error('Room add error')
        else return responseData.name!
    }

    static async remove(room: IRoom): Promise<boolean> {                                
        const params = new URLSearchParams(`auth=${user.data.token}`)
        const {id, ...rest} = room
        try {
            const response = await fetch(`${process.env.REACT_APP_DATABASEURL}/rooms/${id}.json?` + params, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                    
                },           
                body: JSON.stringify({...rest, isActive: false}) 
                });
            if (response.status === 200) return true
            else return false
        }
        catch {
            return false
        }                
    }
}

