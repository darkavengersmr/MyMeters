import { IRoom } from "../../models/interfaces";

export const initialRooms: IRoom[] = [
    {
        id: 'test1',
        title: 'Квартира 1',
        isActive: true,
        meters: [
            {
                id: 'test1',
                title: 'Холодная вода',
                isActive: true,
                values: [
                    {
                        date: new Date(2022, 9, 10, 0, 0, 0, 0),
                        value: 102,
                        userId: 'user1'
                    },
                    {
                        date: new Date(2022, 10, 10, 0, 0, 0, 0),
                        value: 108,
                        userId: 'user1'
                    },
                ] 
            },
            {
                id: 'test2',
                title: 'Горячая вода',
                isActive: true,
                values: [
                    {
                        date: new Date(2022, 9, 10, 0, 0, 0, 0),
                        value: 52,
                        userId: 'user1'
                    },
                    {
                        date: new Date(2022, 10, 10, 0, 0, 0, 0),
                        value: 54,
                        userId: 'user1'
                    },
                ] 
            }
        ]
    },
    {
        id: 'test2',
        title: 'Квартира 2',
        isActive: true,
        meters: [
            {
                id: 'test3',
                title: 'Электричество',
                isActive: true,
                values: [
                    {
                        date: new Date(2022, 9, 10, 0, 0, 0, 0),
                        value: 45443,
                        userId: 'user2'
                    },
                    {
                        date: new Date(2022, 10, 10, 0, 0, 0, 0),
                        value: 45591,
                        userId: 'user2'
                    },
                ] 
            }            
        ]
    }    
]