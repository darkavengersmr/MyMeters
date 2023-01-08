import { CssBaseline, ThemeProvider } from "@mui/material";
import { observer } from "mobx-react-lite";
import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import settings from "../../store/settings";
import user from "../../store/user";

import SendValuesPage from "../../pages/SendValuesPage";
import Spinner from "../spinner";
//import HistoryValuesPage from "../../pages/HistoryValuesPage/HistoryValuesPage";
//import LoginPage from "../../pages/LoginPage/LoginPage";
//import MetersPage from "../../pages/MetersPage";
//import PersonsPage from "../../pages/PersonsPage";
//import ReportsPage from "../../pages/ReportsPasge/ReportsPage";
//import RoomsPage from "../../pages/RoomsPage";
//import SettingsPage from "../../pages/SettingsPage/SettingsPage";
//import HelpPage from "../../pages/HelpPage";

const HistoryValuesPage = lazy(() => import("../../pages/HistoryValuesPage"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const MetersPage = lazy(() => import("../../pages/MetersPage"));
const PersonsPage = lazy(() => import("../../pages/PersonsPage"));
const ReportsPage = lazy(() => import("../../pages/ReportsPasge"));
const RoomsPage = lazy(() => import("../../pages/RoomsPage"));
const SettingsPage = lazy(() => import("../../pages/SettingsPage"));
const HelpPage = lazy(() => import("../../pages/HelpPage"));

const App = observer(() => {  
  const localStorageTheme = localStorage.getItem('mymeters_theme');

  useEffect(() => settings.setTheme(localStorageTheme === 'light' ? localStorageTheme : 'dark'), [localStorageTheme])

  return (    
    <ThemeProvider theme={settings.getTheme()}>
      <CssBaseline />      
      <Suspense fallback={<Spinner/>}> 
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
            path="/"             
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
        </Suspense>  
    </ThemeProvider>
  );
})

export default App;
