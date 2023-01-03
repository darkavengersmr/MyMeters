import { IconButton, TableCell, TableRow } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { IRoom } from "../../models/interfaces";

type RoomsListItemProps = {
    room: IRoom
    onRemove: (id: string) => void
}

function RoomsListItem({room, onRemove}: RoomsListItemProps) {
    return <TableRow>            
    <TableCell>{room.title}</TableCell>
    <TableCell align="right">
        <IconButton aria-label="delete" onClick={() => onRemove(room.id!)}>
            <DeleteIcon />
        </IconButton>
    </TableCell>
</TableRow>
}

export default RoomsListItem;