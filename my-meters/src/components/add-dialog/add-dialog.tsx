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
    funcToCloseOk: (room: any) => void
    funcToCloseCancel: () => void
    dialogTitle: string
    dialogContentText: string
    dialogType: 'room' | 'user' | 'meter'
}

const AddDialog = ({ triggerToOpen, 
                     funcToCloseOk, 
                     funcToCloseCancel, 
                     dialogTitle, 
                     dialogContentText,
                     dialogType
                    }: AddDialogProps ) => {


    const [title, titleAction] = useInput('', 'notNullText')
    const [username, usernameAction] = useInput('', 'notNullText')
    const [meter, meterAction] = useInput('', 'positiveNumber')    

    const onSubmit = () => {
        switch (dialogType) {
            case 'room':
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
                break

            case 'user':
                if (!username.value || !meter.value) {
                    system.sendNotification('Заполните все обязательные поля', 'error')
                } else {
                    console.log('new user')
                    //funcToCloseOk(funcToCloseOkArgs)
                }                
                break

            case 'meter':
                if (!title.value || !meter.value) {
                    system.sendNotification('Заполните все обязательные поля', 'error')
                } else {
                    console.log('new meter')
                    //funcToCloseOk(funcToCloseOkArgs)
                }                
                break

            default:
                throw new Error('Type error');
        }
    }

    return (
    <Dialog open={triggerToOpen} 
            onClose={funcToCloseCancel}
            >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
        <DialogContentText>
            {dialogContentText}
        </DialogContentText>
        { dialogType !== 'user' && 
        <TextField            
            margin="dense"
            id="title"
            label="Квартира"
            type="text"
            fullWidth
            variant="standard"
            {...title}            
        />
        }
        { dialogType === 'user' && 
        <TextField            
            margin="dense"
            id="comment"
            label="Жилец"
            type="text"
            fullWidth
            variant="standard"
            {...username}                        
        />
        }
        { dialogType === 'meter' && 
        <TextField            
            margin="dense"
            id="comment"
            label="Начальное показание"
            type="text"
            fullWidth
            variant="standard"
            {...username}                        
        />
        }        
        </DialogContent>
        <DialogActions>
        <Button onClick={funcToCloseCancel}>Отмена</Button>
        <Button onClick={onSubmit}>{dialogTitle}</Button>
        </DialogActions>
    </Dialog>
    )
}

export default AddDialog
