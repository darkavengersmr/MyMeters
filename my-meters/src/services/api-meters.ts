import { IApiMetersClass, IMeter, IMeterValue, ResponseDataType } from "../models/interfaces";
import system from "../store/system";
import user from "../store/user";

export default class ApiMeters implements IApiMetersClass{    

    static async add(meter: IMeter, roomId: string): Promise<string> {
        system.setShowSpinner(true)        
        let responseData: ResponseDataType
                    
        const params = new URLSearchParams(`auth=${user.data.token}`)
        try {
            const response = await fetch(`${process.env.REACT_APP_DATABASEURL}/rooms/${roomId}/meters.json?` + params, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    
                },           
                body: JSON.stringify(meter) 
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

    static async remove(meter: IMeter, roomId: string): Promise<boolean> {
        system.setShowSpinner(true)                                  
        const params = new URLSearchParams(`auth=${user.data.token}`)
        const {id} = meter
        try {
            const response = await fetch(`${process.env.REACT_APP_DATABASEURL}/rooms/${roomId}/meters/${id}/isActive.json?` + params, {
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

    static async addValue(meterValue: IMeterValue, meterId: string, roomId: string): Promise<boolean> { 
        system.setShowSpinner(true)               
                    
        const params = new URLSearchParams(`auth=${user.data.token}`)

        try {
            await fetch(`${process.env.REACT_APP_DATABASEURL}/rooms/${roomId}/meters/${meterId}/values.json?` + params, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    
                },           
                body: JSON.stringify(meterValue) 
                });
                
            system.setShowSpinner(false)  
            return true 
        } 
        catch {
            system.setShowSpinner(false)
            system.sendNotification('Сетевая ошибка, попробуйте позднее', 'error')
            return false
        }
    }
}

