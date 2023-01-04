import { IconButton, TableCell, TableRow } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { IMeter } from "../../models/interfaces";
import { dateTransform } from "../../helpers/helpers";

type MetersListItemProps = {
    meter: IMeter
    roomId: string
    lastValue: {date: string | null, value: number | null}
    onRemove: (id: string, roomId: string) => void
}

function MetersListItem({meter, roomId, lastValue, onRemove}: MetersListItemProps) {
    return <TableRow>            
                <TableCell>{meter.title}</TableCell>
                <TableCell align="right">{lastValue.date ? dateTransform(lastValue.date) : null}</TableCell>
                <TableCell align="right">{lastValue.value}</TableCell>
                <TableCell align="right">
                    <IconButton aria-label="delete" onClick={() => onRemove(meter.id!, roomId)}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
}

export default MetersListItem;