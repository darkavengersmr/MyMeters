import { observer } from "mobx-react-lite";
import Layout from "../../components/layout";
import MetersList from "../../components/meters-list";
import Spinner from "../../components/spinner";
import rooms from "../../store/rooms"

function MetersPage() {
    return <Layout>
        {rooms.getRooms().length === 0 && <Spinner/>}
        {rooms.getRooms().length > 0 && <MetersList rooms={rooms} />}        
    </Layout>
}

export default observer(MetersPage)