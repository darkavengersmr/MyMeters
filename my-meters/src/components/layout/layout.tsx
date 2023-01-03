import { ReactNode, useState } from "react"
import user from "../../store/user"
import AppHeader from "../app-header"
import MainMenu from "../main-menu"
import system from '../../store/system'
import { observer } from "mobx-react-lite"

type LayoutProps = {
    children: ReactNode
}

function Layout({children}: LayoutProps) {    
    
    const [openMainMenu, setOpenMainMenu] = useState(false)

    const toggleMainMenu = () => {
        setOpenMainMenu(!openMainMenu)        
    }

    return <>
        <AppHeader toggleMainMenu={toggleMainMenu} username={user.data.username}/>
        <MainMenu openMainMenu={openMainMenu} toggleMainMenu={toggleMainMenu}/>
        {children}
        {system.getNotification()}
    </>
}

export default observer(Layout)