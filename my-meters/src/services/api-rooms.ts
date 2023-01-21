import { IApiRoomsClass, IRoom, ResponseDataType } from "../models/interfaces";
import user from "../store/user";
import system from "../store/system";

export default class ApiRooms implements IApiRoomsClass{    

    static async get(id?: string): Promise<{[key: string]: IRoom}> {                
        system.setShowSpinner(true)
        let responseData: {[key: string]: IRoom} | IRoom
        let response: Response
        
        const params = new URLSearchParams(`auth=${user.data.token}`)

        try {
            response = await fetch(`${process.env.REACT_APP_DATABASEURL}/rooms${id ? '/'+id : ''}.json?` + params, {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json',
                    
                },        
                });
            if (id) {
                responseData = await response.json() as IRoom
                system.setShowSpinner(false)
                return {[id]: responseData}
            } else {
                responseData = await response.json() as {[key: string]: IRoom}
                system.setShowSpinner(false)
                return responseData
            }

        }
        catch {
            system.sendNotification('Сетевая ошибка, попробуйте позднее', 'error')
            system.setShowSpinner(false)
        }
        return {}
    }

    static async add(room: IRoom): Promise<string> { 
        system.setShowSpinner(true)       
        let responseData: ResponseDataType
                    
        const params = new URLSearchParams(`auth=${user.data.token}`)

        try {
            const response = await fetch(`${process.env.REACT_APP_DATABASEURL}/rooms.json?` + params, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    
                },           
                body: JSON.stringify(room) 
                });
        
            responseData = await response.json() as ResponseDataType
            system.setShowSpinner(false)
            return responseData.name!      
        }
        catch {
            system.sendNotification('Сетевая ошибка, попробуйте позднее', 'error')
            system.setShowSpinner(false)
            return ''            
        }
    }

    static async remove(room: IRoom): Promise<boolean> {                                
        system.setShowSpinner(true)
        const params = new URLSearchParams(`auth=${user.data.token}`)
        const {id} = room
        try {
            const response = await fetch(`${process.env.REACT_APP_DATABASEURL}/rooms/${id}/isActive.json?` + params, {
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
            system.setShowSpinner(false)
            system.sendNotification('Сетевая ошибка, попробуйте позднее', 'error')
            return false
        }                
    }
}

