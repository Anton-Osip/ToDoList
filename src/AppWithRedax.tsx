import React from 'react';
import './App.css';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton/IconButton";
import {Menu} from "@mui/icons-material";
import {addTodolistAC} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType} from "./Todolist";
import {TodolistWithRedux} from "./TodolistWithRedux";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}



function AppWithRedux() {

    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

    const dispatch = useDispatch()

    function addTodolist(title: string) {
        const todoListId: string = v1()
        dispatch(addTodolistAC(title, todoListId))
    }

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
                <Grid container style = {{padding: "20px"}}>
                    <AddItemForm addItem = {addTodolist}/>
                </Grid>
                <Grid container spacing = {3}>
                    {
                        todolists.map(tl => {

                            return <Grid key = {tl.id} item>
                                <Paper style = {{padding: "10px"}}>
                                    <TodolistWithRedux todoList = {tl}/>
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
