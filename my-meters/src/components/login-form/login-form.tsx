import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInput } from "../../hooks";
import persons from "../../store/persons";
import rooms from "../../store/rooms";
import user from "../../store/user";

type LoginFormProps = {
    login: (email: string, password: string) => Promise<boolean>
}

function LoginForm({login}: LoginFormProps) {

    const [email, emailAction] = useInput('', 'email')
    const [password, passwordAction] = useInput('', 'password')
    const [loginError, setLoginError] = useState(false)

    const navigate = useNavigate()

    const tryLogin = async () => {
        setLoginError(false)
        if (! await login(email.value, password.value)) {
            setLoginError(true)
            emailAction.setInputValue('')
            passwordAction.setInputValue('')
        } else { 
            persons.init()
            rooms.init()
            if (user.data.isAdmin) navigate('/meters')
            else navigate('/send')
        }
    }

    return <Container sx={{ mt: 16,  width: 320 }}>                 
                <Grid container                                              
                            direction="column"                                 
                            >

                <Typography textAlign='center'>
                    Мои счетчики
                </Typography>

                    <TextField
                            margin="dense"                    
                            label="Введите email"
                            type="text"
                            fullWidth                    
                            variant="standard"
                            {...email}
                        />
                    <TextField
                            margin="dense"                    
                            label="Введите пароль"
                            type="password"
                            fullWidth
                            variant="standard"
                            {...password}
                        />

                    <Button variant='contained'
                            sx={{ mt: 4 }}
                            onClick={tryLogin} >
                        Войти
                    </Button>
                    {
                        loginError &&
                        <Typography textAlign='center' color="red" sx={{ mt: 2}}>
                            Ошибка! Проверьте email/пароль
                        </Typography>
                    }
                    
                </Grid>    
            </Container>
}

export default LoginForm