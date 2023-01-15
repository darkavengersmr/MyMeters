import { Container, Grid, Typography } from "@mui/material"
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { dateNow } from "../../helpers/helpers"
import { IRoom } from "../../models/interfaces"
import rooms from "../../store/rooms"
import user from "../../store/user"
import SendValuesItem from "../send-value-item/send-value-item"
import { useState } from "react";
import SendMessage from "../send-message";
import messages from "../../store/messages";

type SendValuesProps = {
    room: IRoom | undefined
}

function SendValues({room}: SendValuesProps) {    

    const [selectRoom, setSelectRoom] = useState(room)
    const [selectRoomId, setSelectRoomId] = useState(rooms.getRooms().length > 0 ? rooms.getRooms()[0].id : '')

    return <Container sx={{ mt: 4,  width: 320 }}>                 
    <Grid container                                              
                direction="column"                                 
                >

    <Typography textAlign='center' variant="h5" sx={{ mb: 2}}>
        Передать показания
    </Typography>

    {
        rooms.getRooms().length > 0 && user.data.isAdmin &&
        
        <Select
            labelId="room-label"
            id="demo-simple-select"
            value={selectRoomId}                         
            onChange={(event) => setSelectRoomId(event.target.value)}
            sx={{my: 2}}
            >
            {
            rooms.getRooms().map((room) => {
                return <MenuItem key={room.id} value={room.id} onClick={() => setSelectRoom(rooms.getRoomById(room.id!))}>{room.title}</MenuItem>
            })
            }          
        </Select>
    }

    {
        selectRoom && user.data.isAdmin &&
        selectRoom.meters.map(meter => <SendValuesItem key={meter.id} 
                                                       meter={meter} 
                                                       lastValue={rooms.getMetersLastValue(meter.id!, selectRoom.id!)} 
                                                       sendValue={(meter, value) => rooms.setMeterValue({userId: user.data.id!, date: dateNow(), value: parseInt(value)}, meter.id!, selectRoom.id!)}
                                   />)
    }

    {
        room && !user.data.isAdmin &&
        room.meters.map(meter => <SendValuesItem key={meter.id} 
                                                      meter={meter} 
                                                      lastValue={rooms.getMetersLastValue(meter.id!, room.id!)} 
                                                      sendValue={(meter, value) => rooms.setMeterValue({userId: user.data.id!, date: dateNow(), value: parseInt(value)}, meter.id!, room.id!)}
                                   />)
    }

    {
        !user.data.isAdmin &&
        <SendMessage sendToday={messages.sendToday()}
                     addMessage={message => messages.addMessage({userId: user.data.id!, date: dateNow(), message, isActive: true, username: user.data.username}, user.data.id!)} />
    }

    </Grid>    
</Container>
}

export default SendValues