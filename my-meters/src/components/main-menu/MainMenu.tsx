import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HelpIcon from '@mui/icons-material/Help';
import BarChartIcon from '@mui/icons-material/BarChart';
import CategoryIcon from '@mui/icons-material/Category';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import TimelineIcon from '@mui/icons-material/Timeline';
import user from "../../store/user";

type MainMenuProps = {
    openMainMenu: boolean
    toggleMainMenu: () => void
}

function MainMenu({openMainMenu, toggleMainMenu}: MainMenuProps) {

    const navigate = useNavigate();

    return <SwipeableDrawer
    anchor="left"
    open={openMainMenu}
    onClose={toggleMainMenu}
    onOpen={toggleMainMenu}
  >
    <List>                   
        <ListItem onClick={() => navigate(`/send`)}>
          <ListItemButton>
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary="Подать показания" />
          </ListItemButton>
        </ListItem>
    </List>        
    <Divider />
    { user.data.isAdmin &&
    <>
    <List>                   
    <ListItem onClick={() => navigate(`/rooms`)}>
      <ListItemButton>
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText primary="Квартиры" />
      </ListItemButton>
    </ListItem>
    <ListItem onClick={() => navigate(`/meters`)}>
      <ListItemButton>
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Счетчики" />
      </ListItemButton>
    </ListItem>
    <ListItem onClick={() => navigate(`/persons`)}>
      <ListItemButton>
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Жильцы" />
      </ListItemButton>
    </ListItem>                  
    </List>
    <Divider />
    </>
    }    
    <List>
        <ListItem onClick={() => navigate(`/history`)}>
          <ListItemButton>
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText primary="История показаний" />
          </ListItemButton>
        </ListItem>        
        <ListItem onClick={() => navigate(`/report`)}>
          <ListItemButton>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Графики потребления" />
          </ListItemButton>
        </ListItem>
    <List>
    <Divider />
    </List>
        <ListItem onClick={() => navigate(`/settings`)}>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Настройки" />
          </ListItemButton>
        </ListItem>
        <ListItem onClick={() => navigate(`/help`)}>
          <ListItemButton>
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Справка" />
          </ListItemButton>
        </ListItem>
    </List> 
  </SwipeableDrawer>;
}

export default MainMenu;