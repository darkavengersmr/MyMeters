import { Button, Card, CardActions, CardContent, Grid, TextField, Typography } from "@mui/material"
import { useInput } from "../../hooks"

type SendMessageProps = {
    sendToday: boolean
    addMessage: (message: string) => void
}

function SendMessage({sendToday, addMessage}: SendMessageProps) {    

    // eslint-disable-next-line
    const [message, messageAction] = useInput('', 'notNullText')

    return <>
            <Card variant="outlined" sx={{ mb: 4 }}>
                <CardContent>
                    <Typography sx={{ mt: 0, mb: 0}} variant="h6">
                        Сообщение
                    </Typography>                    

                    {
                        !sendToday &&
                        <TextField                            
                            margin="dense"                    
                            label="(при необходимости)"
                            type="number"
                            fullWidth
                            multiline
                            rows={4}     
                            variant="standard"
                            {...message}
                    />
                    }
                    {
                        sendToday &&
                        <Typography sx={{ mt: 2, mb: 0}} variant="body2" color="greenyellow">            
                        успешно отправлено
                        </Typography>
                    }
                </CardContent>
                {
                    !sendToday &&            
                <CardActions>                    
                        <Grid container 
                        direction="column"                                 
                        >
                            <Button disabled={message.value.length < 3} variant='contained'                    
                                onClick={()=> addMessage(message.value)} >
                                Отправить
                            </Button>
                        </Grid>                                
                </CardActions>
                }
            </Card>

    </>

}

export default SendMessage