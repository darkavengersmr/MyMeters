import { IPerson } from "../../models/interfaces"

export const initialPersons: IPerson[] = [
    {
        id: 'user1',
        username: 'Иванов И.',
        route: '639dd822-17c4afa8-9b0ef1872637d2a',                
        isActive: true,    
        dateIn: "2018-10-10",
        roomId: 'test1'
    },
    {
        id: 'user2',
        username: 'Петров П.',
        route: '8c4f34a9-475b0f3f-c4210c041e81fa2',                
        isActive: true,    
        dateIn: "2020-10-10",
        roomId: 'test2'
    },
]
