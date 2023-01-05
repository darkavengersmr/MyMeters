import { CssBaseline, ThemeProvider } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Routes, Route } from 'react-router-dom';
import LoginPage from "../../pages/LoginPage/LoginPage";
import MetersPage from "../../pages/MetersPage";
import PersonsPage from "../../pages/PersonsPage";
import RoomsPage from "../../pages/RoomsPage";
import settings from "../../store/settings";
import user from "../../store/user";

const App = observer(() => {

  return (
    <ThemeProvider theme={settings.getTheme()}>
      <CssBaseline />      
      <Routes>
          {
            user.data.isAuth &&
            <>
            <Route
            path="/rooms"             
            element={<RoomsPage />} />
          <Route
            path="/meters"             
            element={<MetersPage />} />
          <Route
            path="/persons"             
            element={<PersonsPage />} />
            </>
          }          
          <Route
            path="/login"
            element={<LoginPage />} />
          <Route path="*" element={<LoginPage />} />
      </Routes>
    </ThemeProvider>
  );
})

export default App;
