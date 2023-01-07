import Layout from "../../components/layout/layout";

import user from "../../store/user";
import rooms from '../../store/rooms';
import { observer } from 'mobx-react-lite';
import HistoryValues from "../../components/history-values";

function HistoryValuesPage() {

    return <Layout>
                <HistoryValues room={rooms.getRoomById(user.data.roomId!)}/>                
         </Layout>
    
        
}

export default observer(HistoryValuesPage)