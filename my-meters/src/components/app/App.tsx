import { CssBaseline } from "@mui/material";
import { observer } from "mobx-react-lite";
import user from "../../store/user";

const App = observer(() => {

  return (
    <>
    <CssBaseline />
    <div>{user.data.username}</div>
    <button onClick={() => {}}>test</button>
    </>
  );
})

export default App;
