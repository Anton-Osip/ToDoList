import React, {ChangeEvent} from "react";
import {TaskProps} from "../../TodoList";
import {EditableSpan} from "../../../../../../../common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../../../../model/tasks-reducer";
import {useAppDispatch} from "../../../../../../../app/hooks/useAppDispatch";

type Props = {
    todoListId: string
    task: TaskProps
}

export const Task = ({task, todoListId}: Props) => {
    const {id, title, isDone} = task

    const dispatch = useAppDispatch()


    const removeTasks = () => {
        dispatch(removeTaskAC({todolistId: todoListId, taskId: id}))
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC({todolistId: todoListId, taskId: id, isDone: e.currentTarget.checked}))
    }

    const updateTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC({todolistId: todoListId, taskId: id, title}))
    }

    return (
        <ListItem sx = {{p: 0, justifyContent: 'space-between', opacity: isDone ? '0.5' : '1'}}>
            <div>
                <Checkbox color = "primary" checked = {isDone} onChange = {changeTaskStatus}/>
                <EditableSpan value = {title} onChange = {updateTaskTitle}/>
            </div>
            <IconButton aria-label = "delete" onClick = {removeTasks} size = "small" color = "primary">
                <DeleteIcon fontSize = "small"/>
            </IconButton>
        </ListItem>
    )
}
