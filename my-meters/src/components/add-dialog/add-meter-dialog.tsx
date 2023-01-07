import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import system from '../../store/system'
import { useInput } from '../../hooks';
import { IMeter } from '../../models/interfaces';

type AddDialogProps = {
    triggerToOpen: boolean
    funcToCloseOk: (meter: IMeter, roomId: string, initialValue: number) => void    
    funcToCloseCancel: () => void
    roomId: string
    dialogTitle: string
    dialogContentText: string    
}

const AddMeterDialog = ({ triggerToOpen, 
                     funcToCloseOk, 
                     funcToCloseCancel, 
                     roomId,
                     dialogTitle, 
                     dialogContentText                     
                    }: AddDialogProps ) => {


    const [title, titleAction] = useInput('', 'notNullText')
    const [initialValue, initialValueAction] = useInput('', 'positiveNumber')


    const onSubmit = () => {
        if (!title.value || !initialValue.value) {
            system.sendNotification('Заполните все обязательные поля', 'error')
        } else {            
            funcToCloseOk({                        
                title: title.value,
                isActive: true,
                values: []                
                }, roomId, parseInt(initialValue.value))
            titleAction.setInputValue('')
            initialValueAction.setInputValue('')
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
            label="Например: газ"
            type="text"
            fullWidth
            variant="standard"
            {...title}            
        />
        <TextField            
            margin="dense"
            id="title"
            label="Начальное показание"
            type="number"
            fullWidth
            variant="standard"
            {...initialValue}            
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

export default AddMeterDialog
