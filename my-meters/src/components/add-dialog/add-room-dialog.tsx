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
    funcToCloseOk: (room: IRoom) => Promise<boolean>
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


    const onSubmit = async () => {
        if (!title.value) {
            system.sendNotification('Заполните все обязательные поля', 'error')
        } else {
            if (! await funcToCloseOk({                        
                title: title.value,
                isActive: true,
                meters: []
            })) {
                system.sendNotification('Ошибка создания квартиры', 'error')
            }
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
            label="Например: Квартира №32"
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
