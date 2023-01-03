import { observer } from "mobx-react-lite";
import Layout from "../../components/layout";
import RoomsList from "../../components/rooms-list";
import rooms from "../../store/rooms"

function RoomsPage() {
    return <Layout>
        <RoomsList rooms={rooms} />
    </Layout>
}

export default observer(RoomsPage)