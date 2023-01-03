import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type ConfirmDialogProps = {
    triggerToOpen: boolean
    funcToCloseOk: () => void
    funcToCloseCancel: () => void
    dialogTitle: string 
    dialogContentText: string
}

const ConfirmDialog = ({ triggerToOpen, 
                       funcToCloseOk, 
                       funcToCloseCancel, 
                       dialogTitle, 
                       dialogContentText                    
                    }: ConfirmDialogProps) => {

    return (
    <Dialog open={triggerToOpen} 
            onClose={funcToCloseCancel}
            >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
            <DialogContentText>
                {dialogContentText}
            </DialogContentText>        
        </DialogContent>
        <DialogActions>
        <Button onClick={funcToCloseCancel}>Отмена</Button>
        <Button onClick={funcToCloseOk}>ОК</Button>
        </DialogActions>
    </Dialog>
    )
}

export default ConfirmDialog;