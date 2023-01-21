import { IconButton, TableCell, TableRow } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import { IPerson } from "../../models/interfaces";
import { dateTransform } from "../../helpers/helpers";

type MetersListItemProps = {
    person: IPerson      
    onRemove: (id: string) => void
    onShare: (route: string) => void
}

function PersonsListItem({person, onShare, onRemove}: MetersListItemProps) {
    return <TableRow>            
                <TableCell sx={{p: 0.5, m: 0, minWidth: 120}}>{person.username}
                    <IconButton aria-label="share" onClick={() => onShare(person.route)}>
                        <ShareIcon />
                    </IconButton>                
                </TableCell>
                <TableCell align="right">{person.dateIn ? dateTransform(person.dateIn, 2) : null}</TableCell>

                <TableCell align="right" sx={{p: 0.5, m: 0, width: 40}}>
                    <IconButton aria-label="delete" onClick={() => onRemove(person.id!)}>
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
}

export default PersonsListItem;