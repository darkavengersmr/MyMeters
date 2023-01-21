import { Container, Grid, Typography } from "@mui/material"
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { IRoom } from "../../models/interfaces"
import rooms from "../../store/rooms"
import user from "../../store/user"
import { useState } from "react";
import HistoryValuesItem from "../history-values-item/history-values-item";
import { Box } from "@mui/system";

type HistoryValuesProps = {
    room: IRoom | undefined
}

function HistoryValues({room}: HistoryValuesProps) {    

    const [selectRoom, setSelectRoom] = useState(room)
    const [selectRoomId, setSelectRoomId] = useState(rooms.getRooms().length > 0 ? rooms.getRooms()[0].id : '')

    return <Container sx={{ mt: 4 }}>                 
    <Box textAlign='center'>
    <Typography textAlign='center' variant="h5" sx={{ mb: 2}}>
        История показаний
    </Typography>

    {
        rooms.getRooms().length > 0 && user.data.isAdmin &&
        
        <Select            
            labelId="room-label"
            id="demo-simple-select"
            value={selectRoomId}                         
            onChange={(event) => setSelectRoomId(event.target.value)}
            sx={{my: 2, width: 320}}
            >
            {
            rooms.getRooms().map((room) => {
                return <MenuItem key={room.id} value={room.id} onClick={() => setSelectRoom(rooms.getRoomById(room.id!))}>{room.title}</MenuItem>
            })
            }          
        </Select>
    }
    </Box>
    

    {
        selectRoom && selectRoom.meters && user.data.isAdmin &&
        <Grid container justifyContent="center" columnSpacing={4}>
            {
                selectRoom.meters.map(meter => <Grid item key={meter.id}><HistoryValuesItem meter={meter} limit={12} /></Grid>)
            }
        </Grid>
    }

    {
        room && room.meters && !user.data.isAdmin &&

        <Grid container justifyContent="center" columnSpacing={4}>
            {
                room.meters.map(meter => <Grid item key={meter.id}><HistoryValuesItem meter={meter} limit={6} /></Grid>)
            }            
        </Grid>

        
    }

      
</Container>
}

export default HistoryValues