import { IRoom } from "../../models/interfaces"

type SendValuesProps = {
    room: IRoom | undefined
}

function SendValues({room}: SendValuesProps) {
    return <div>{room?.title}</div>
}

export default SendValues