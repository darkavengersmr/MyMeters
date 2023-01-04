import { observer } from "mobx-react-lite";
import Layout from "../../components/layout";
import PersonsList from "../../components/persons-list";
import rooms from '../../store/rooms'
import persons from '../../store/persons'

function PersonsPage() {
    return <Layout>
        <PersonsList rooms={rooms} persons={persons}/>
    </Layout>
}

export default observer(PersonsPage)