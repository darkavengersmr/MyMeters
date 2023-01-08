import { useCallback} from 'react';
import { useCookies } from 'react-cookie';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import Layout from '../../components/layout/layout';
import settings from '../../store/settings';
import { observer } from 'mobx-react-lite';

const SettingsPage = () => {

    const [, setCookie] = useCookies();

    const handleChangeTheme = useCallback(() => {        
        if (settings.theme === 'light') {            
            settings.setTheme('dark')
            setCookie('mymeters_theme', 
                      'dark',  
                      {maxAge: 60*60*24*365*5});
        } else {
            settings.setTheme('light')
            setCookie('mymeters_theme', 
                      'light', 
                      {maxAge: 60*60*24*365*5})
        }   
    // eslint-disable-next-line     
    }, [settings.theme, setCookie])

    return <Layout>
            <Container sx={{ mt: "2rem", width: "100%" }} maxWidth="xs">
                <Grid container sx={{ mt: "1rem" }}>
                    <Grid sx={{ width: "80%" }} >
                        <Typography variant="body1" 
                                    component="div" 
                                    sx={{ mt: "8px", ml: "8px" }}
                        >
                        Темная тема
                        </Typography>
                    </Grid>
                    <Grid sx={{ width: "20%" }}>
                        <Switch sx={{ ml: "20px" }} 
                                checked={settings.theme === 'dark' ? true : false} 
                                onChange={handleChangeTheme} 
                        />
                    </Grid>                    
                </Grid>            
            </Container>
        </Layout>
    
}

export default observer(SettingsPage)
