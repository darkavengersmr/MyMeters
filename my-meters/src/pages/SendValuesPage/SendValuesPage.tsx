import { useNavigate, useSearchParams } from 'react-router-dom';

import Layout from "../../components/layout/layout";

import SendValues from "../../components/send-values";
import user from "../../store/user";
import persons from "../../store/persons";
import rooms from '../../store/rooms';
import { useEffect } from "react";
import { observer } from 'mobx-react-lite';

function SendValuesPage() {
    const [search] = useSearchParams();    

    const navigate = useNavigate()
    const route = search.get('id')

    useEffect(() => {
        if (route && !user.data.isAuth && !user.data.isAdmin) {
            const [name, host, sec] = route.split('-')
            if (name && host && sec) {
                user.login(`${name}@${host}.ru`, sec).then(result => {
                    if (result) {
                        persons.init()                                                                  
                    } else {                        
                        navigate('/login')
                    }
                })
            }
        }
        if (!route && !user.data.isAuth) {
            const refreshToken = localStorage.getItem('my_meter_refresh_token')            
            if (refreshToken) {                              
                user.loginWithToken(refreshToken).then(result => {
                    if (result) {
                        persons.init()                        
                    } else {                    
                        navigate('/login')        
                    }
                })
            } else {                
                navigate('/login')
            }            
        }
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (route && persons.data.length > 0 && !user.data.isAdmin) {            
            const person = persons.getByRoute(route)
            if (person) user.set(person)
        }      
        if (!route && persons.data.length > 0 && user.data.isAdmin && rooms.getRooms().length === 0) {                    
            rooms.init()
            navigate('/meters')            
        }
    // eslint-disable-next-line
    }, [persons.data.length])

    useEffect(() => {
        if (user.data.roomId && !user.data.isAdmin) rooms.init(user.data.roomId)
    // eslint-disable-next-line
    }, [user.data.roomId])

    return <Layout>                
                {rooms.getRooms().length > 0 && <SendValues room={rooms.getRoomById(user.data.roomId!)} />}
         </Layout>
    
        
}

export default observer(SendValuesPage)