import React, {useState} from 'react';
import './App.css';
import {TaskProps, TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import Container from '@mui/material/Container';
import {ButtonAppBar} from "./ButtonAppBar";
import Grid from '@mui/material/Grid2';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {
    addTodolistAC,
    changeTodoListFilter,
    changeTodoListTitle,
    removeTodolistAC,
} from "./model/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./model/tasks-reducer";
import {v1} from "uuid";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";

export type FilterValue = 'All' | 'Active' | 'Completed'
export type Todolist = {
    id: string
    title: string
    filter: FilterValue
}
export type TasksState = {
    [key: string]: TaskProps[]
}

export type ThemeMode = 'dark' | 'light'

export const App = () => {
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#2f8802',
            },
        },
    })

    const todolists = useSelector<RootState, Todolist[]>(state => state.todoLists)
    const tasks = useSelector<RootState, TasksState>(state => state.tasks)
    const dispatch = useDispatch()
    const changeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    // TASK CRUD
    const addTask = (todolistId: string, title: string) => {
        dispatch(addTaskAC({todolistId, title}))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC({todolistId, taskId, isDone}))
    }

    const updateTaskTitle = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId, title}))
    }

    const removeTasks = (todolistId: string, taskId: string) => {
        dispatch(removeTaskAC({todolistId, taskId}))
    }

    // TODOLIST CRUD
    const removeTodoList = (todolistId: string) => {
        dispatch(removeTodolistAC({todoListId: todolistId}))
    }

    const addTodoList = (title: string) => {
        const newTodoListId = v1()
        dispatch(addTodolistAC({title, newTodoListId}))
    }

    const updateTodoListTitle = (todoListId: string, title: string) => {
        dispatch(changeTodoListTitle({todoListId, title}))
    }

    const filterTasks = (todoListId: string, filter: FilterValue) => {
        dispatch(changeTodoListFilter({todoListId, filter}))
    }

    return (
        <ThemeProvider theme = {theme}>
            <CssBaseline/>
            <Container fixed>
                <ButtonAppBar changeModeHandler = {changeModeHandler}/>
                <Grid container>
                    <Grid sx = {{m: '0 auto'}}>
                        <AddItemForm addItem = {addTodoList}/>
                    </Grid>
                </Grid>
                <Grid container spacing = {2} sx = {{mt: '40px'}}>
                    {todolists.map(tl => {
                        return (
                            <Grid key = {tl.id} size = {{xs: 12, sm: 6, md: 4, xl: 3}}>
                                <TodoList
                                    title = {tl.title}
                                    tasks = {tasks[tl.id]}
                                    todoListId = {tl.id}
                                    filter = {tl.filter}
                                    removeTasks = {removeTasks}
                                    filterTasks = {filterTasks}
                                    addTask = {addTask}
                                    changeTaskStatus = {changeTaskStatus}
                                    removeTodoList = {removeTodoList}
                                    updateTaskTitle = {updateTaskTitle}
                                    updateTodoListTitle = {updateTodoListTitle}/>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </ThemeProvider>
    );
}


