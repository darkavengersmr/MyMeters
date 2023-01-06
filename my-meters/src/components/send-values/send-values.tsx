import { Button, Container, Grid, Typography } from "@mui/material"
import { useState } from "react"
import { dateNow } from "../../helpers/helpers"
import { useInput } from "../../hooks"
import { IRoom } from "../../models/interfaces"
import rooms from "../../store/rooms"
import user from "../../store/user"
import SendValuesItem from "../send-value-item/send-value-item"

type SendValuesProps = {
    room: IRoom | undefined
}

function SendValues({room}: SendValuesProps) {    

    return <Container sx={{ mt: 4,  width: 320 }}>                 
    <Grid container                                              
                direction="column"                                 
                >

    <Typography textAlign='center' variant="h5" sx={{ mb: 2}}>
        Передать показания
    </Typography>


    {
        room?.meters.map(meter => <SendValuesItem key={meter.id} 
                                                  meter={meter} 
                                                  lastValue={rooms.getMetersLastValue(meter.id!, room.id!)} 
                                                  sendValue={(meter, value) => rooms.setMeterValue({userId: user.data.id!, date: dateNow(), value: parseInt(value)}, meter.id!, room.id!)}
                                   />)
    }
                    
    </Grid>    
</Container>
}

export default SendValues