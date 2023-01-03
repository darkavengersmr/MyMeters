import { KeyboardEventHandler, useMemo } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import system from '../../store/system'
import { useInput } from '../../hooks';
import { IRoom } from '../../models/interfaces';

type AddDialogProps = {
    triggerToOpen: boolean
    funcToCloseOk: (room: IRoom) => void
    funcToCloseCancel: () => void
    dialogTitle: string
    dialogContentText: string    
}

const AddRoomDialog = ({ triggerToOpen, 
                     funcToCloseOk, 
                     funcToCloseCancel, 
                     dialogTitle, 
                     dialogContentText                     
                    }: AddDialogProps ) => {


    const [title, titleAction] = useInput('', 'notNullText')


    const onSubmit = () => {
        if (!title.value) {
            system.sendNotification('Заполните все обязательные поля', 'error')
        } else {
            console.log('new room')
            funcToCloseOk({                        
                title: title.value,
                isActive: true,
                meters: []
            })
            titleAction.setInputValue('')
            funcToCloseCancel()
        }                                
    }

    return (
    <>
    <Dialog open={triggerToOpen} 
            onClose={funcToCloseCancel}
            >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
        <DialogContentText>
            {dialogContentText}
        </DialogContentText>
        <TextField            
            margin="dense"
            id="title"
            label="Квартира"
            type="text"
            fullWidth
            variant="standard"
            {...title}            
        />
        </DialogContent>
        <DialogActions>
        <Button onClick={funcToCloseCancel}>Отмена</Button>
        <Button onClick={onSubmit}>{dialogTitle}</Button>
        </DialogActions>
    </Dialog>
    </>
    )
}

export default AddRoomDialog
