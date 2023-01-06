import { Button, Container, Grid, Paper, Table, TableBody, TableContainer } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { IPerson, IPersonsClass, IRoomsClass } from "../../models/interfaces";
import ConfirmDialog from "../confirm-dialog";
import { useEffect, useState } from "react";
import PersonsListItem from "../persons-list-item";
import AddPersonDialog from "../add-dialog/add-person-dialog";
import ShareDialog from "../share-dialog";
import system from "../../store/system";
import { observer } from "mobx-react-lite";

type MetersListProps = {
    rooms: IRoomsClass
    persons: IPersonsClass
}

function PersonsList({rooms, persons}: MetersListProps) {

    const [confirmRemove, setConfirmRemove] = useState('')
    const [shareDialog, setShareDialog] = useState('')
    const [roomId, setRoomId] = useState('')
    const [addModal, setAddModal] = useState(false)

    const confirmRemoveOk = async () => {        
        if (! await persons.remove(confirmRemove)) {
            system.sendNotification('Ошибка удаления жильца', 'error')
        }        
        setConfirmRemove('')
         
    }

    const confirmRemoveCancel = () => {
        setConfirmRemove('')        
    }

    const [expanded, setExpanded] = useState<string | false>(rooms.getRooms().length > 0 ? rooms.getRooms()[0].id! : false)

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
                            persons.getByRoomId(room.id!).map((person) => {
                                return (
                                        <PersonsListItem
                                            key={person.id}
                                            person={person}
                                            onShare={(route) => setShareDialog(route)}                                                                                 
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
        <Button variant="outlined" onClick={() => {setAddModal(true); setRoomId(room.id!)}}>
            <PlaylistAddIcon sx={{mr: 1}} />добавить жильца
        </Button>   
        </Grid>
        </AccordionDetails>
      </Accordion>
    ))}

    
    
    <ConfirmDialog triggerToOpen={!!confirmRemove} 
                   funcToCloseOk={confirmRemoveOk} 
                   funcToCloseCancel={confirmRemoveCancel} 
                   dialogTitle={"Подтверждение удаления"} dialogContentText={"Удалить жильца из списка?"} />

    <AddPersonDialog triggerToOpen={addModal} 
               funcToCloseOk={persons.add.bind(persons)}               
               funcToCloseCancel={() => setAddModal(false)}
               roomId={roomId}
               dialogTitle={"Добавить жильца"} 
               dialogContentText={"Введите ФИО жильца"} />

    <ShareDialog triggerToOpen={!!shareDialog} 
                 funcToCloseCancel={() => setShareDialog('')} 
                 dialogTitle={"Ссылка для входа"} dialogContentText={shareDialog} />

    </Container>    
    
}

export default observer(PersonsList)