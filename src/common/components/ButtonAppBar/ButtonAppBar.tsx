import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {MenuButton} from "../MenuButton/MenuButton";
import {Switch} from "@mui/material";
import {changeThemeAC} from "../../../app/app-reducer";
import {useAppDispatch} from "../../../app/hooks/useAppDispatch";
import {useAppSelector} from "../../../app/hooks/useAppSelector";


export const ButtonAppBar = () => {
    const themeMode = useAppSelector(state => state.app.themeMode)
    const dispatch = useAppDispatch()

    const changeModeHandler = () => {
        dispatch(changeThemeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}))
    }
    return (
        <Box sx = {{flexGrow: 1, paddingBottom: '80px'}}>
            <AppBar position = "fixed" color = "primary">
                <Toolbar>
                    <Typography variant = "h5" component = "div" sx = {{flexGrow: 1}}>
                        Tasks Manager
                    </Typography>
                    <MenuButton>Login</MenuButton>
                    <MenuButton>Logout</MenuButton>
                    <Switch color = {'primary'} onChange = {changeModeHandler}/>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
