import { Alert, Snackbar } from "@mui/material";
import { runInAction, makeAutoObservable } from "mobx"

type Notification = "success" | "error" | "warning" | "info"

class System {

    notifications: JSX.Element | undefined = undefined
    showSpinner: boolean = false

    constructor() {
        makeAutoObservable(this)
    }
    
    private setNotification(notification: JSX.Element | undefined) {
        this.notifications = notification
    }

    sendNotification(text: string, type: Notification) {        
        runInAction(() => this.setNotification(            
              <Snackbar open={true}>
                <Alert severity={type} sx={{ width: '100%' }} variant="filled">
                  {text}
                </Alert>
              </Snackbar>            
        ))
    }
    
    getNotification() {               
        if (this.notifications) {                        
            const send = this.notifications
            runInAction(() => {
                setTimeout(() => this.setNotification(undefined), 2000)                
            })
            return send
        } else return this.notifications
    }

    setShowSpinner(show: boolean) {
        this.showSpinner = show
    }

}
export default new System()