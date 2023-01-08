import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { observer } from 'mobx-react-lite';
import user from '../../store/user';
import Layout from '../../components/layout/layout';

const HelpPage = () => { 
    return <Layout>
            <Container sx={{ width: '100%', mt: "1rem", mb: "2rem" }} maxWidth="md">
                
                <Typography variant="h5" component="div" sx={{ mt: "1rem" }}>
                Мои счетчики
                </Typography>

                <Typography variant="body1" component="div" sx={{ mt: "0.5rem" }}>
                Сервиc предназначен для учета показаний счетчиков различных ресурсов 
                (электричество, газ, холодная и горячая вода)
                </Typography>
                
                <Typography variant="h6" component="div" sx={{ mt: "1rem" }}>
                1. Подача показаний
                </Typography>

                <Typography variant="body1" component="div" sx={{ mt: "0.5rem" }}>
                Перейдите по полученной ссылке. Откроется личный кабинет на странице 
                подачи показаний счетчиков. Подайте данные по текущим показаниям в
                отчетную дату каждого месяца
                </Typography>


                <Typography variant="h6" component="div" sx={{ mt: "1rem" }}>
                2. Просмотр истории показаний
                </Typography>

                <Typography variant="body1" component="div" sx={{ mt: "0.5rem" }}>
                Нажмите на значок меню в левом верхнем углу приложения/страницы и 
                выберите пункт меню "История показаний". В открывшемся разделе можно 
                посмотреть статистику показаний по каждому из счетчиков
                </Typography>

                <Typography variant="h6" component="div" sx={{ mt: "1rem" }}>
                3. Просмотр графика потребления
                </Typography>

                <Typography variant="body1" component="div" sx={{ mt: "0.5rem" }}>
                Нажмите на значок меню в левом верхнем углу приложения/страницы и 
                выберите пункт меню "График потребления". В этом разделе можно 
                посмотреть графики потребления по каждому из счетчиков
                </Typography>

                <Typography variant="h6" component="div" sx={{ mt: "1rem" }}>
                4. Настройки
                </Typography>

                <Typography variant="body1" component="div" sx={{ mt: "0.5rem" }}>
                Нажмите на значок меню в левом верхнем углу приложения/страницы и 
                выберите пункт меню "Настройки". В данном разделе можно 
                изменить личные настройки, например тему оформления
                </Typography>
                {
                    user.data.isAdmin &&
                    <>
                    <Typography variant="h6" component="div" sx={{ mt: "1rem" }}>
                    5. Справочники (для администратора)
                    </Typography>

                    <Typography variant="body1" component="div" sx={{ mt: "0.5rem" }}>
                    Нажмите на значок меню в левом верхнем углу приложения/страницы и 
                    выберите пункт меню один из справочников "Квартиры", "Счетчики" или 
                    "Жильцы". В открывшемся разделе можно добавить или удалить 
                    соответствующие сущности из справочников
                    </Typography>

                    <Typography variant="body2" component="div" sx={{ mt: "1rem" }}>
                    Версия приложения: {process.env.REACT_APP_VERSION}
                    </Typography>
                    </>

                    
                }
            </Container>
        </Layout>
}

export default observer(HelpPage)
