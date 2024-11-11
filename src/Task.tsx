import React, {ChangeEvent} from "react";
import {TaskProps} from "./TodoList";
import {Button} from "./Button";
import {EditableSpan} from "./EditableSpan";

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
        <li className = {isDone ? 'is-done' : ''}>
            <Button
                onClick = {removeTaskHandler}
                title = {"X"}/>
            <input type = "checkbox" checked = {isDone} onChange = {changeTaskStatusHandler}/>
            <EditableSpan value = {title} onChange = {changeTaskTitleHandler}/>

        </li>
    )
}


