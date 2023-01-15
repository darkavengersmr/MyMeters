import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import system from '../../store/system'
import { useInput } from '../../hooks';
import { IMessage, IPerson } from '../../models/interfaces';

type AddDialogProps = {
    triggerToOpen: boolean
    funcToCloseOk: (message: IMessage) => Promise<boolean>
    funcToCloseCancel: () => void
    message: IMessage
    dialogTitle: string
    dialogContentText: string    
}

const AddMessageDialog = ({ triggerToOpen, 
                     funcToCloseOk, 
                     funcToCloseCancel, 
                     message,                     
                     dialogTitle, 
                     dialogContentText                     
                    }: AddDialogProps ) => {


    const [reply, replyAction] = useInput('', 'notNullText')


    const onSubmit = async () => {
        if (!reply.value) {
            system.sendNotification('Заполните все обязательные поля', 'error')
        } else {
            if (! await funcToCloseOk({                        
                ...message,
                reply: reply.value
            })) {
                system.sendNotification('Ошибка отправки ответа', 'error')
            }
            replyAction.setInputValue('')
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
            label="Ваш ответ"
            type="text"
            fullWidth
            variant="standard"
            {...reply}            
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

export default AddMessageDialog
