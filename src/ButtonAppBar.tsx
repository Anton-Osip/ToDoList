import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {MenuButton} from "./MenuButton";
import {Switch} from "@mui/material";

type Props = {
    changeModeHandler: () => void
}

export const ButtonAppBar = ({changeModeHandler}: Props) => {
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
