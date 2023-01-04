import { Link } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getCurrentHost } from '../../helpers/helpers';

type ConfirmDialogProps = {
    triggerToOpen: boolean    
    funcToCloseCancel: () => void
    dialogTitle: string 
    dialogContentText: string
}

const ShareDialog = ({ triggerToOpen,                        
                       funcToCloseCancel, 
                       dialogTitle, 
                       dialogContentText                    
                    }: ConfirmDialogProps) => {

    const url = getCurrentHost() + dialogContentText

    return (
    <Dialog open={triggerToOpen} 
            onClose={funcToCloseCancel}
            >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
            <DialogContentText>
                <Link href={url}>{url}</Link>                
            </DialogContentText>        
        </DialogContent>
        <DialogActions>
        <Button onClick={funcToCloseCancel}>ОК</Button>        
        </DialogActions>
    </Dialog>
    )
}

export default ShareDialog;