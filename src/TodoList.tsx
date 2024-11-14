import React from "react";
import {Task} from "./Task";
import {FilterValue} from "./App";

import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import List from '@mui/material/List';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

export type TaskProps = {
    id: string
    title: string
    isDone: boolean
};

type Props = {
    title: string
    tasks: TaskProps[]
    filter: FilterValue
    todoListId: string
    removeTasks: (todolistId: string, taskId: string) => void
    filterTasks: (todoListId: string, filter: FilterValue) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodoList: (todolistId: string) => void
    updateTaskTitle: (todolistId: string, taskId: string, title: string) => void
    updateTodoListTitle: (todolistId: string, title: string) => void
}

export const TodoList = (props: Props) => {
    const {
        title,
        tasks,
        filter,
        todoListId,
        removeTasks,
        filterTasks,
        addTask,
        changeTaskStatus,
        removeTodoList,
        updateTaskTitle,
        updateTodoListTitle
    } = props;


    const changeFilterHandler = (filter: FilterValue) => {
        filterTasks(todoListId, filter)
    }
    const removeTodoListHandler = () => {
        removeTodoList(todoListId)
    }
    const addTaskCallback = (title: string) => {
        addTask(todoListId, title)
    }
    const updateTodoListTitleHandler = (title: string) => {
        updateTodoListTitle(todoListId, title)
    }


    let filteredTasks = tasks
    if (filter === 'Active') filteredTasks = tasks.filter((task: TaskProps) => !task.isDone)
    if (filter === 'Completed') filteredTasks = tasks.filter((task: TaskProps) => task.isDone)

    const mappedTasks = filteredTasks.length ? filteredTasks.map(task => {
        return <Task key = {task.id} {...task} todoListId = {todoListId} removeTasks = {removeTasks}
                     changeTaskStatus = {changeTaskStatus} updateTaskTitle = {updateTaskTitle}/>
    }) : <div>Нет данных</div>

    return (
        <Paper elevation = {2} sx = {{p: '20px'}}>
            <h3><EditableSpan value = {title} onChange = {updateTodoListTitleHandler}/>
                <IconButton aria-label = "delete" onClick = {removeTodoListHandler} color = "primary">
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem = {addTaskCallback}/>
            <List>
                {mappedTasks}
            </List>
            <Box sx = {{display: 'flex', justifyContent: 'space-between'}}>
                <Button
                    color = "primary"
                    variant = {filter === 'All' ? 'contained' : 'outlined'}
                    onClick = {() => changeFilterHandler('All')}
                >All</Button>
                <Button
                    color = "primary"
                    variant = {filter === 'Active' ? 'contained' : 'outlined'}
                    onClick = {() => changeFilterHandler('Active')}
                >Active</Button>
                <Button
                    color = "primary"
                    variant = {filter === 'Completed' ? 'contained' : 'outlined'}
                    onClick = {() => changeFilterHandler('Completed')}
                >Completed</Button>
            </Box>
        </Paper>

    )
}
