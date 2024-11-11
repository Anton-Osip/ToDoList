import React, {ChangeEvent} from "react";
import {TaskProps} from "./TodoList";
import {Button} from "./Button";

type Props = {
    todoListId: string
    removeTasks: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
} & TaskProps;

export const Task = ({id, isDone, title, todoListId, removeTasks, changeTaskStatus}: Props) => {

    const removeTaskHandler = () => {
        removeTasks(todoListId, id)
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(todoListId, id, e.currentTarget.checked)
    }

    return (
        <li className = {isDone ? 'is-done' : ''}>
            <Button
                onClick = {removeTaskHandler}
                title = {"X"}/>
            <input type = "checkbox" checked = {isDone} onChange = {changeTaskStatusHandler}/>
            <span>{title}</span>
        </li>
    )
}


