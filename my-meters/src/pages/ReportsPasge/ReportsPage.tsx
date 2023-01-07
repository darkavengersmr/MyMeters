import Layout from "../../components/layout/layout";

import user from "../../store/user";
import rooms from '../../store/rooms';
import { observer } from 'mobx-react-lite';
import Reports from "../../components/reports";

function ReportsPage() {

    return <Layout>
                <Reports room={rooms.getRoomById(user.data.roomId!)}/>                
         </Layout>
    
        
}

export default observer(ReportsPage)