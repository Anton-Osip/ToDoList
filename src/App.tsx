import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [todoListId: string]: TaskType[]
}
export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const todoListId1 = v1()
    const todoListId2 = v1()
    const todoListInitial: TodoListType[] = [
        {id: todoListId1, title: '"What to learn"', filter: "active"},
        {id: todoListId2, title: '"What to do"', filter: "completed"},
    ]
    const allTasksInitial: TasksStateType = {
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'TypeScript', isDone: false},
            {id: v1(), title: 'RTK query', isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'TypeScript', isDone: false},
            {id: v1(), title: 'RTK query', isDone: false},
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Milk', isDone: false},
        ]
    }

    const [todoLists, setTodoLists] = useState<TodoListType[]>(todoListInitial);
    const [tasks, setTasks] = useState<TasksStateType>(allTasksInitial);

    const addTodoLists = (title: string) => {
        const newTodoList: TodoListType = {id: v1(), title: title, filter: "all"}
        setTodoLists([newTodoList, ...todoLists]);
        setTasks({...tasks, [newTodoList.id]: []})
    }
    const removeTask = (todoListId: string, taskId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(task => task.id !== taskId)});
    }
    const addTask = (todoListId: string, title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    const changeTaskStatus = (todoListId: string, taskId: string, taskStatus: boolean) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(task => task.id !== taskId ? task : {...task, isDone: taskStatus})
        })
    }
    const changeFilter = (todoListId: string, filter: FilterValuesType) => {
        setTodoLists(todoLists.map(todoList => todoList.id === todoListId ? {
            ...todoList,
            filter: filter
        } : todoList))
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(todo => todo.id !== todoListId))
        delete tasks[todoListId]
    }
    const changeTaskTitle = (todoListId: string, taskId: string, newValue: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(task => task.id === taskId ? {...task, title: newValue} : task)
        })
    }
    const changeTodoListTitle = (todoListId: string, value: string) => {
        setTodoLists([...todoLists.map(tl => tl.id === todoListId ? {...tl, title: value} : tl)])
    }


    const todoListsComponents = todoLists.map((todoList: TodoListType) => {
        let tasksForTodolist = tasks[todoList.id];
        if (todoList.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
        }
        if (todoList.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
        }

        return (
            <Grid item>
                <Paper style = {{padding: '10px'}}>
                    <Todolist
                        key = {todoList.id}
                        todoListId = {todoList.id}
                        title = {todoList.title}
                        tasks = {tasksForTodolist}
                        filter = {todoList.filter}
                        removeTask = {removeTask}
                        changeFilter = {changeFilter}
                        addTask = {addTask}
                        changeTaskStatus = {changeTaskStatus}
                        removeTodoList = {removeTodoList}
                        changeTaskTitle = {changeTaskTitle}
                        changeTodoListTitle = {changeTodoListTitle}
                    /></Paper>
            </Grid>
        )
    })

    return (
        <div className = "App">
            <AppBar position = {'static'} color = {'secondary'}>
                <Toolbar>
                    <IconButton edge = {'start'} color = {'inherit'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant = "h4" color = {'inherit'}>News</Typography>
                    <Button color = {'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <AddItemForm addItem = {addTodoLists}/>
                <Grid container spacing = {10} style={{padding:'10px'}}>
                    {todoListsComponents}
                    </Grid>
                    </Container>

                    </div>
                    );
                }

export default App;
