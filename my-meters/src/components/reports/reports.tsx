import { Container, Grid, Typography } from "@mui/material"
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { IRoom } from "../../models/interfaces"
import rooms from "../../store/rooms"
import user from "../../store/user"
import { useState } from "react";
import ReportsItem from "../reports-item";
import { Box } from "@mui/system";

type ReportsProps = {
    room: IRoom | undefined
}

function Reports({room}: ReportsProps) {    

    const [selectRoom, setSelectRoom] = useState(room)
    const [selectRoomId, setSelectRoomId] = useState(rooms.getRooms().length > 0 ? rooms.getRooms()[0].id : '')

    return <Container sx={{ mt: 4 }}>                 
    <Box textAlign='center'>
    <Typography variant="h5">
        Графики потребления
    </Typography>

    {
        rooms.getRooms().length > 0 && user.data.isAdmin &&
        
        <Select
            labelId="room-label"
            id="demo-simple-select"
            value={selectRoomId}                         
            onChange={(event) => setSelectRoomId(event.target.value)}
            sx={{my: 2, width: 320 }}
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
                selectRoom.meters.map(meter => <Grid item key={meter.id}><ReportsItem meter={meter} limit={12} /></Grid>)
            }
        </Grid>
    }

    {
        room && room.meters && !user.data.isAdmin &&
        <Grid container justifyContent="center" columnSpacing={4}>
            {
                room.meters.map(meter => <Grid item key={meter.id}><ReportsItem  meter={meter} limit={12} /></Grid>)
            }
        </Grid>
    }
        
</Container>
}

export default Reports