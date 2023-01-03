import { createTheme, Theme } from "@mui/material";

const darkTheme: Theme = createTheme({
    palette: {
      mode: 'dark', 
    },
  });
  
  const lightTheme: Theme = createTheme({
    palette: {
      mode: 'light', 
    },
  });

  const initialTheme: string = 'dark'

  const theme = { initialTheme, lightTheme, darkTheme}

  export default theme