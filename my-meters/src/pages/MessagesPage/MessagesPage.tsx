import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import Layout from "../../components/layout";
import MessagesList from "../../components/messages-list";
import { IMessage } from "../../models/interfaces";
import messages from "../../store/messages";
import user from "../../store/user";

function MessagesPage() {
 
    const [messagesState, setMessagesState] = useState([] as IMessage[])

    useEffect(() => {
        async function loadMessages(userId: string) {
            setMessagesState(await messages.getMessages(userId))
        }

        async function loadAllMessages() {
            setMessagesState(await messages.getAllMessages())
        }

        if (user.data.id && !user.data.isAdmin) {
            loadMessages(user.data.id)            
        }

        if (user.data.id && user.data.isAdmin) {
            loadAllMessages()            
        }
    }, [user.data.id, messages.data])

    return <Layout>
        <MessagesList messages={messagesState} isAdmin={!!user.data.isAdmin} />
    </Layout>
}

export default observer(MessagesPage)