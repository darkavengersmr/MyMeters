import { Container, Paper, Table, TableBody, TableContainer } from "@mui/material";
import { IMessage, IPerson } from "../../models/interfaces";
import { observer } from "mobx-react-lite";
import MessagesListItem from "../messages-list-item";

type MessagesListProps = {
    messages: IMessage[]
    isAdmin: boolean
}

function MessagesList({messages, isAdmin}: MessagesListProps) {
    return <Container sx={{ mt: "2rem", width: "100%" }} maxWidth="sm">
    
            {                
                messages.map((message) => {
                    return (
                            <MessagesListItem
                                key={message.id} 
                                message={message}
                                isAdmin={isAdmin}
                            />
                    )
                })
            }            

    </Container>     
    
}

export default observer(MessagesList)