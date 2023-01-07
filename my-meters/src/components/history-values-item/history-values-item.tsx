import { Card, CardContent, Typography } from "@mui/material"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { dateTransform } from "../../helpers/helpers"
import { IMeter } from "../../models/interfaces"

type HistoryValuesItemProps = {
    meter: IMeter
    limit: number
}

function HistoryValuesItem({meter, limit}: HistoryValuesItemProps) {    

    return <>
            <Card variant="outlined" sx={{ mb: 2 }}>
                <CardContent>
                    <Typography sx={{ mt: 0, mb: 0}} variant="h6">
                    {meter.title}
                    </Typography>

                    <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 240 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Дата</TableCell>
                            <TableCell align="right">Показания</TableCell>                            
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {meter.values.slice(-limit).map((meterValue) => (
                            <TableRow
                            key={`${meterValue.date} ${meterValue.value}`}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">{dateTransform(meterValue.date)}</TableCell>
                            <TableCell align="right">{meterValue.value}</TableCell>                            
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>

                </CardContent>            
            </Card>

    </>

}

export default HistoryValuesItem