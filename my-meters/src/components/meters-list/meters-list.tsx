import { Button, Container, Grid, Paper, Table, TableBody, TableContainer } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { IRoomsClass } from "../../models/interfaces";
import ConfirmDialog from "../confirm-dialog";
import { useState } from "react";
import MetersListItem from "../meters-list-item/meters-list-item";
import AddMeterDialog from "../add-dialog/add-meter-dialog";
import { observer } from "mobx-react-lite";

type MetersListProps = {
    rooms: IRoomsClass
}

function MetersList({rooms}: MetersListProps) {

    const [confirmRemoveMeterId, setConfirmRemoveMeterId] = useState('')
    const [confirmRemoveRoomId, setConfirmRemoveRoomId] = useState('')
    const [addModal, setAddModal] = useState(false)

    const confirmRemoveOk = async () => {
        if (await rooms.removeMeter(confirmRemoveMeterId, confirmRemoveRoomId)) {
            setConfirmRemoveMeterId('')
            setConfirmRemoveRoomId('')
        }
    }

    const confirmRemoveCancel = () => {
        setConfirmRemoveMeterId('')
        setConfirmRemoveRoomId('')
    }

    const [expanded, setExpanded] = useState<string | false>(rooms.getRooms().length > 0 ? rooms.getRooms()[0].id! : false )

    const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

    return <Container sx={{ mt: "1rem", width: "100%" }} maxWidth="sm">
    
    {rooms.getRooms().map((room, index) => (
        <Accordion expanded={expanded === room.id!} onChange={handleChange(room.id!)} key={room.id}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{room.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableBody>
                            {                
                            rooms.getMeters(room.id!).map((meter) => {
                                return (
                                        <MetersListItem
                                            key={meter.id}
                                            meter={meter}
                                            roomId={room.id!}
                                            lastValue={meter.id && room.id ? rooms.getMetersLastValue(meter.id, room.id) : {date: null, value: null}} 
                                            onRemove={(id) => {setConfirmRemoveMeterId(id); setConfirmRemoveRoomId(room.id!)}} />
                                )
                            })
                        }            
                </TableBody>           
            </Table>
        </TableContainer>
        <Grid container sx={{ mt: "1rem" }}
                direction="column"                                 
                >
        <Button variant="outlined" onClick={() => {setAddModal(true); setConfirmRemoveRoomId(room.id!)}}>
            <PlaylistAddIcon sx={{mr: 1}} />добавить счетчик
        </Button>   
        </Grid>
        </AccordionDetails>
      </Accordion>
    ))}
    
    <ConfirmDialog triggerToOpen={!!confirmRemoveMeterId} 
                   funcToCloseOk={confirmRemoveOk} 
                   funcToCloseCancel={confirmRemoveCancel} 
                   dialogTitle={"Подтверждение удаления"} dialogContentText={"Удалить счетчик из списка?"} />

    <AddMeterDialog triggerToOpen={addModal} 
               funcToCloseOk={rooms.addMeter.bind(rooms)}               
               funcToCloseCancel={() => setAddModal(false)}
               roomId={confirmRemoveRoomId}
               dialogTitle={"Добавить счетчик"} 
               dialogContentText={"Введите вид счетчика"} />
        
    </Container>    
    
}

export default observer(MetersList)