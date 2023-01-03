import { Theme } from "@mui/material"
import { makeAutoObservable } from "mobx"
import { ISettingsClass } from "../models/interfaces"
import theme from "./initial-store-data/settings"

class Settings implements ISettingsClass {    
    theme = theme.initialTheme    

    getTheme(): Theme {
        return this.theme == 'dark' ? theme.darkTheme : theme.lightTheme
    }

    constructor() {
        makeAutoObservable(this)
    }
}

export default new Settings()