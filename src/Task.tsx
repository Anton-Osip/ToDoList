import React, {ChangeEvent} from "react";
import {TaskProps} from "./TodoList";
import {Button} from "./Button";

type Props = {
    removeTasks: (id: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
} & TaskProps;

export const Task = ({id, isDone, title, removeTasks, changeTaskStatus}: Props) => {

    const removeTaskHandler = () => {
        removeTasks(id)
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(id, e.currentTarget.checked)
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


