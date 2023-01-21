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
                <TableCell sx={{ p: 0.5, m: 0 }}>{meter.title}</TableCell>
                <TableCell align="right" sx={{ p: 0.5, m: 0, minWidth: 70 }}>{lastValue.date ? dateTransform(lastValue.date, 2) : null}</TableCell>
                <TableCell align="right" sx={{ p: 0.5, m: 0, minWidth: 60 }}>{lastValue.value}</TableCell>
                <TableCell align="right" sx={{ p: 0.5, m: 0, width: 30 }}>
                    <IconButton aria-label="delete" onClick={() => onRemove(meter.id!, roomId)}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
}

export default MetersListItem;