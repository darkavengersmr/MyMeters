import { IApiMetersClass, IMeter, ResponseDataType } from "../models/interfaces";
import user from "../store/user";

export default class ApiMeters implements IApiMetersClass{    

    static async add(meter: IMeter, roomId: string): Promise<string> {        
        let responseData: ResponseDataType
                    
        const params = new URLSearchParams(`auth=${user.data.token}`)

        const response = await fetch(`${process.env.REACT_APP_DATABASEURL}/rooms/${roomId}/meters.json?` + params, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            
        },           
        body: JSON.stringify(meter) 
        });

        responseData = await response.json() as ResponseDataType        
        if (responseData.error) throw new Error('Room add error')
        else return responseData.name!
    }

    static async remove(meter: IMeter, roomId: string): Promise<boolean> {                                
        const params = new URLSearchParams(`auth=${user.data.token}`)
        const {id, ...rest} = meter
        try {
            const response = await fetch(`${process.env.REACT_APP_DATABASEURL}/rooms/${roomId}/meters/${id}.json?` + params, {
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
