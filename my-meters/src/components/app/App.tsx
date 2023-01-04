import { CssBaseline, ThemeProvider } from "@mui/material";
import { observer } from "mobx-react-lite";
import { Routes, Route } from 'react-router-dom';
import MetersPage from "../../pages/MetersPage";
import PersonsPage from "../../pages/PersonsPage";
import RoomsPage from "../../pages/RoomsPage";
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
            path="/meters"             
            element={<MetersPage />} />
          <Route
            path="/persons"             
            element={<PersonsPage />} />
      </Routes>
    </ThemeProvider>
  );
})

export default App;
