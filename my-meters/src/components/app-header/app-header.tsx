import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

type AppHeaderProps = {
    username: string
    toggleMainMenu: () => void
}

function AppHeader({toggleMainMenu, username}: AppHeaderProps) {
    return <AppBar position="static">
        <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => toggleMainMenu()}
            >
                <MenuIcon />
            </IconButton>

          <Typography component="div" sx={{ flexGrow: 1 }}>
            Мои счетчики
          </Typography>

          <Box sx={{ display: "contents"}}>
            <Typography sx={{ mr: 1 }}>
                {username}
            </Typography>
            <AccountCircleIcon />            
          </Box>
        </Toolbar>
    </AppBar>
}

export default AppHeader