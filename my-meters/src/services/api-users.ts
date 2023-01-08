import { IApiUsersClass, LoginResponseType } from "../models/interfaces";
import system from "../store/system";

export default class ApiUsers implements IApiUsersClass {
    static async login(email: string, password: string): Promise<LoginResponseType | boolean> {
        system.setShowSpinner(true)
        let responseData: LoginResponseType
        try {
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_APIKEY}`, {
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
            responseData = await response.json() as LoginResponseType            
        }
        catch {
            system.setShowSpinner(false)            
            return false
        }
        system.setShowSpinner(false)
        if (responseData.error) return false
        else return responseData
    }
}
