import { observer } from "mobx-react-lite";
import LoginForm from "../../components/login-form";
import user from '../../store/user'

function LoginPage() {
    return <LoginForm login={user.login.bind(user)}/>
    
}

export default observer(LoginPage)