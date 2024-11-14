import React, {useState} from 'react';
import './App.css';
import {TaskProps, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import Container from '@mui/material/Container';
import {ButtonAppBar} from "./ButtonAppBar";
import Grid from '@mui/material/Grid2';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

export type FilterValue = 'All' | 'Active' | 'Completed'
type Todolist = {
    id: string
    title: string
    filter: FilterValue
}
export type TasksStateType = {
    [key: string]: TaskProps[]
}

export type ThemeMode = 'dark' | 'light'

export const App = () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const [todolists, setTodolists] = useState<Todolist[]>([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#2f8802',
            },
        },
    })

    const changeModeHandler = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }

    // TASK CRUD
    const addTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const filterTasks = (todoListId: string, filter: FilterValue) => {
        setTodolists(todolists.map(tl => tl.id === todoListId ? {...tl, filter} : tl))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)})
    }

    const updateTaskTitle = (todolistId: string, taskId: string, title: string) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => (t.id === taskId ? {...t, title} : t)),
        })
    }

    const removeTasks = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})
    }

    // TODOLIST CRUD
    const removeTodoList = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const addTodoList = (title: string) => {
        const newTodoListId = v1()
        const newTodoList: Todolist = {id: newTodoListId, title, filter: 'All'}
        setTodolists([newTodoList, ...todolists])
        setTasks({...tasks, [newTodoListId]: []})
    }

    const updateTodoListTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
    }


    return (
        <ThemeProvider theme = {theme}>
            <CssBaseline />
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


