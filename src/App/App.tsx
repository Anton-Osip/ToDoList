import React from 'react'
import '../App.css';
import {Todolist} from '../Todolist';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Menu} from '@mui/icons-material';
import {useApp} from "./hooks/useApp";


function App() {
    const {
        todolists,
        tasks,
        addTodolist,
        removeTask,
        changeFilter,
        addTask,
        changeStatus,
        removeTodolist,
        changeTaskTitle,
        changeTodolistTitle
    } = useApp()

    return (
        <div className = "App">
            <AppBar position = "static">
                <Toolbar>
                    <IconButton edge = "start" color = "inherit" aria-label = "menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant = "h6">
                        News
                    </Typography>
                    <Button color = "inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style = {{padding: '20px'}}>
                    <AddItemForm addItem = {addTodolist}/>
                </Grid>
                <Grid container spacing = {3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];

                            return <Grid item key = {tl.id}>
                                <Paper style = {{padding: '10px'}}>
                                    <Todolist
                                        id = {tl.id}
                                        title = {tl.title}
                                        tasks = {allTodolistTasks}
                                        removeTask = {removeTask}
                                        changeFilter = {changeFilter}
                                        addTask = {addTask}
                                        changeTaskStatus = {changeStatus}
                                        filter = {tl.filter}
                                        removeTodolist = {removeTodolist}
                                        changeTaskTitle = {changeTaskTitle}
                                        changeTodolistTitle = {changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
