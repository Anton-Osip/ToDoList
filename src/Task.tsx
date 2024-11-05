import React from "react";
import {TaskProps} from "./TodoList";
import {Button} from "./Button";

type Props = {
    removeTasks: (id: string) => void
} & TaskProps;

export const Task = ({id, isDone, title, removeTasks}: Props) => {

    const removeTaskHandler = () => {
        removeTasks(id)
    }

    return (
        <li>
            <Button
                onClick = {removeTaskHandler}
                title = {"X"}/>
            <input type = "checkbox" checked = {isDone}/>
            <span>{title}</span>
        </li>
    )
}
