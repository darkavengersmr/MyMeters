import { Button, Card, CardActions, CardContent, Grid, TextField, Typography } from "@mui/material"
import { dateNow, dateTransform } from "../../helpers/helpers"
import { useInput } from "../../hooks"
import { IMeter } from "../../models/interfaces"

type SendValuesItemProps = {
    meter: IMeter
    lastValue: {
        date: string | null;
        value: number | null;
    }
    sendValue: (meter: IMeter, value: string) => Promise<boolean>
}

function SendValuesItem({meter, lastValue, sendValue}: SendValuesItemProps) {    

    // eslint-disable-next-line
    const [meterValue, meterValueAction] = useInput('', 'notNullText')

    return <>
            <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                    <Typography sx={{ mt: 0, mb: 0}} variant="h6">
                    {meter.title}
                    </Typography>

                    <Typography sx={{ mt: 2, mb: 0}} variant="caption" color={lastValue.date && dateNow() === lastValue.date ? "greenyellow" : 'red'}>            
                        Последнее показание: {lastValue.value} <br/>
                        Дата: {lastValue.date? dateTransform(lastValue.date) : ""}                         
                    </Typography>
                    {
                        lastValue.date && dateNow() !== lastValue.date &&
                        <TextField                            
                            margin="dense"                    
                            label="Введите текущее показание"
                            type="number"
                            fullWidth                    
                            variant="standard"
                            {...meterValue}
                    />
                    }
                    {
                        lastValue.date && dateNow() === lastValue.date &&
                        <Typography sx={{ mt: 2, mb: 0}} variant="body2">            
                        Данные успешно отправлены
                        </Typography>
                    }
                </CardContent>            
                <CardActions>
                    { lastValue.date && dateNow() !== lastValue.date &&
                        <Grid container 
                        direction="column"                                 
                        >
                            <Button disabled={!(parseInt(meterValue.value) > 0)} variant='contained'                    
                                onClick={()=> sendValue(meter, meterValue.value)} >
                                Отправить
                            </Button>
                        </Grid>
                    }                    
                </CardActions>
            </Card>

    </>

}

export default SendValuesItem