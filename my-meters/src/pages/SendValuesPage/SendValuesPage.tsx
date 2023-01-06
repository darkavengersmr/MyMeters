import { useNavigate, useSearchParams } from 'react-router-dom';

import Layout from "../../components/layout/layout";
import SendValues from "../../components/send-values";
import user from "../../store/user";
import persons from "../../store/persons";
import rooms from '../../store/rooms';
import { useEffect, useState } from "react";
import { observer } from 'mobx-react-lite';

function SendValuesPage() {
    const [search, setSearch] = useSearchParams();    

    const navigate = useNavigate()
    const route = search.get('id')

    useEffect(() => {
        if (route) {
            const [name, host, sec] = route.split('-')
            if (name && host && sec) {
                user.login(`${name}@${host}.ru`, sec).then(result => {
                    if (result) {
                        persons.init()
                        rooms.init()                                             
                    } else {
                        navigate('/login')
                    }
                })
            }
        }               
    }, [])

    useEffect(() => {
        if (route) {
            const person = persons.getByRoute(route)
            if (person) user.set(person)                                   
        } 
    }, [persons.data.length])

    return <>
            <div>{}</div>
            <Layout>                
                <SendValues room={rooms.getRoomById(user.data.roomId!)}/>                
            </Layout>
    </>
        
}

export default observer(SendValuesPage)