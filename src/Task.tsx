import React from "react";
import {TaskProps} from "./TodoList";
import {Button} from "./Button";

type Props = {
    removeTasks: (id: number) => void
} & TaskProps;

export const Task = ({id, isDone, title, removeTasks}: Props) => {
    return (
        <li>
            <Button
                onClick = {() => {
                    removeTasks(id)
                }}
                title = {"X"}/>
            <input type = "checkbox" checked = {isDone}/>
            <span>{title}</span>
        </li>
    )
}
