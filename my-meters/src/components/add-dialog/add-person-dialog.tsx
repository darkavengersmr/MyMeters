import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import system from '../../store/system'
import { useInput } from '../../hooks';
import { IPerson } from '../../models/interfaces';
import { dateNow } from '../../helpers/helpers';

type AddDialogProps = {
    triggerToOpen: boolean
    funcToCloseOk: (room: IPerson) => Promise<boolean>
    funcToCloseCancel: () => void
    roomId: string
    dialogTitle: string
    dialogContentText: string    
}

const AddPersonDialog = ({ triggerToOpen, 
                     funcToCloseOk, 
                     funcToCloseCancel, 
                     roomId,
                     dialogTitle, 
                     dialogContentText                     
                    }: AddDialogProps ) => {


    const [title, titleAction] = useInput('', 'notNullText')


    const onSubmit = async () => {
        if (!title.value) {
            system.sendNotification('Заполните все обязательные поля', 'error')
        } else {
            if (! await funcToCloseOk({                        
                username: title.value,
                isActive: true,            
                route: '',    
                roomId,
                dateIn: dateNow()
            })) {
                system.sendNotification('Ошибка создания жильца', 'error')
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
            label="Например: Иванов И."
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

export default AddPersonDialog
