import { Container, Table, TableBody, TableContainer, Grid, Button } from "@mui/material";
import Paper from '@mui/material/Paper';
import { IRoomsClass } from "../../models/interfaces";
import RoomsListItem from "../rooms-list-item";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ConfirmDialog from "../confirm-dialog";
import { useState } from "react";
import AddRoomDialog from "../add-dialog/add-room-dialog";

type RoomsListProps = {
    rooms: IRoomsClass
}

function RoomsList({rooms}: RoomsListProps) {

    const [confirmRemove, setConfirmRemove] = useState('')
    const [addModal, setAddModal] = useState(false)

    const confirmRemoveOk = () => {
        if (rooms.removeRoom(confirmRemove)) setConfirmRemove('')
    }

    const confirmRemoveCancel = () => {
        setConfirmRemove('')
    }

    return <Container sx={{ mt: "1rem", width: "100%" }} maxWidth="sm">
    <TableContainer component={Paper}>
        <Table aria-label="simple table">
            <TableBody>
                        {                
                        rooms.getRooms().map((room) => {
                            return (
                                    <RoomsListItem
                                        key={room.id} 
                                        room={room}                                        
                                        onRemove={(id) => setConfirmRemove(id)} />
                            )
                        })
                    }            
            </TableBody>           
        </Table>
    </TableContainer>
    <Grid container sx={{ mt: "1rem" }}
                direction="column"                                 
                >
        <Button variant="outlined" onClick={() => setAddModal(true)}>
            <PlaylistAddIcon sx={{mr: 1}} />добавить квартиру
        </Button>   
    </Grid>
    
    <ConfirmDialog triggerToOpen={!!confirmRemove} 
                   funcToCloseOk={confirmRemoveOk} 
                   funcToCloseCancel={confirmRemoveCancel} 
                   dialogTitle={"Подтверждение удаления"} dialogContentText={"Удалить квартиру из списка?"} />

    <AddRoomDialog triggerToOpen={addModal} 
               funcToCloseOk={rooms.addRoom.bind(rooms)}
               funcToCloseCancel={() => setAddModal(false)}
               dialogTitle={"Добавить квартиру"} 
               dialogContentText={"Введите адрес или пояснение"} />
        
    </Container>    
    
}

export default RoomsList;