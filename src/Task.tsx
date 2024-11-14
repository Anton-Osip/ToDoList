import React, {ChangeEvent} from "react";
import {TaskProps} from "./TodoList";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from '@mui/material/Checkbox';

import ListItem from '@mui/material/ListItem';

type Props = {
    todoListId: string
    removeTasks: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    updateTaskTitle: (todolistId: string, taskId: string, title: string) => void
} & TaskProps;

export const Task = ({id, isDone, title, todoListId, removeTasks, changeTaskStatus, updateTaskTitle}: Props) => {

    const removeTaskHandler = () => {
        removeTasks(todoListId, id)
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(todoListId, id, e.currentTarget.checked)
    }

    const changeTaskTitleHandler = (title: string) => {
        updateTaskTitle(todoListId, id, title)
    }

    return (
        <ListItem sx = {{p: 0, justifyContent: 'space-between', opacity: isDone ? '0.5' : '1'}}>
            <div>
                <Checkbox color = "primary" checked = {isDone} onChange = {changeTaskStatusHandler}/>
                <EditableSpan value = {title} onChange = {changeTaskTitleHandler}/>
            </div>
            <IconButton aria-label = "delete" onClick = {removeTaskHandler} size = "small" color = "primary">
                <DeleteIcon fontSize = "small"/>
            </IconButton>
        </ListItem>
    )
}


