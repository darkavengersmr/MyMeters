import { Card } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IMessage, IPerson } from "../../models/interfaces";
import Grid from "@mui/material/Grid/Grid";
import { dateTransform } from "../../helpers/helpers";
import Button from "@mui/material/Button";
import AddMessageDialog from "../add-dialog/add-message-dialog";
import messagesStore from "../../store/messages";
import { useState } from "react";

type MessagesListItemProps = {
    message: IMessage
    isAdmin: boolean
}

function MessagesListItem({message, isAdmin}: MessagesListItemProps) {

    const [addModal, setAddModal] = useState(false)

    return <>
    
    <Grid container sx={{ justifyContent: 'center', mt: 4}}>

        <Typography variant="h6">
            {dateTransform(message.date)} {isAdmin && message.username} 
        </Typography>

    </Grid>

    <Grid container sx={{ justifyContent: 'right'}}>
    
    <Card variant="outlined" sx={{ my: 1, textAlign: 'right', background: '#344', borderRadius: 4, width: '90%' }}>
                <CardContent>
                    <Typography variant="body1">
                    {message.message} 
                    </Typography>
                </CardContent>
    </Card>

    </Grid>
    <Grid container sx={{ justifyContent: 'left'}}>

    { message.reply &&
        <Card variant="outlined" sx={{ my: 1, textAlign: 'left', background: '#224', borderRadius: 4, width: '90%' }}>
            <CardContent>
                <Typography variant="body1">
                    {message.reply}
                </Typography>
            </CardContent>
        </Card>
    }
    
    </Grid>
    <Grid container sx={{ justifyContent: 'right'}}>

    { !message.reply && isAdmin &&
        <Button onClick={() => setAddModal(true)}>Ответить</Button>
    }

    </Grid>

    <AddMessageDialog triggerToOpen={addModal} 
                      funcToCloseOk={messagesStore.replyToMessage.bind(messagesStore)}
                      funcToCloseCancel={() => setAddModal(false)}
                      message={message}
                      dialogTitle={"Ответить"} 
                      dialogContentText={"Введите ответ на сообщение"} />
    </>

}

export default MessagesListItem