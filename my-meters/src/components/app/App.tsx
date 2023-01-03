import { CssBaseline, ThemeProvider } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Routes, Route } from 'react-router-dom';
import RoomsPage from "../../pages/RoomsPage";
import UsersPage from "../../pages/UsersPage";
import settings from "../../store/settings";

const App = observer(() => {

  return (
    <ThemeProvider theme={settings.getTheme()}>
      <CssBaseline />
      <Routes>          
          <Route
            path="/rooms"             
            element={<RoomsPage />} />
          <Route
            path="/users"             
            element={<UsersPage />} />
      </Routes>
    </ThemeProvider>
  );
})

export default App;
