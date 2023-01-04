import { observer } from "mobx-react-lite";
import Layout from "../../components/layout";
import MetersList from "../../components/meters-list";
import rooms from "../../store/rooms"

function MetersPage() {
    return <Layout>
        <MetersList rooms={rooms} />
    </Layout>
}

export default observer(MetersPage)