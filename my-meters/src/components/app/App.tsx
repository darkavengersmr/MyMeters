import { CssBaseline, ThemeProvider } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Routes, Route } from 'react-router-dom';
import HelpPage from "../../pages/HelpPage";

import HistoryValuesPage from "../../pages/HistoryValuesPage/HistoryValuesPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import MetersPage from "../../pages/MetersPage";
import PersonsPage from "../../pages/PersonsPage";
import ReportsPage from "../../pages/ReportsPasge/ReportsPage";
import RoomsPage from "../../pages/RoomsPage";
import SendValuesPage from "../../pages/SendValuesPage";
import SettingsPage from "../../pages/SettingsPage/SettingsPage";
import settings from "../../store/settings";
import user from "../../store/user";

const App = observer(() => {
  const [cookies] = useCookies(['mymeters_theme'])

  useEffect(() => settings.setTheme(cookies.mymeters_theme ? cookies.mymeters_theme : 'dark'), [])

  return (    
    <ThemeProvider theme={settings.getTheme()}>
      <CssBaseline />      
      <Routes>          
          {
            user.data.isAdmin &&
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
          {
            user.data.isAuth &&
            <>
            <Route
            path="/history"             
            element={<HistoryValuesPage />} />      
            <Route
            path="/report"             
            element={<ReportsPage />} />    
            </>
          }          
          <Route
          path="/send"             
          element={<SendValuesPage />} />
          <Route
          path="/settings"             
          element={<SettingsPage />} />
          <Route
          path="/help"             
          element={<HelpPage />} />
          <Route
            path="/login"
            element={<LoginPage />} />
          <Route path="*" element={<LoginPage />} />
      </Routes>
    </ThemeProvider>
  );
})

export default App;
