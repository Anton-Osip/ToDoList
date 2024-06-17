import React from "react";
import {TasksType} from "./TodoList";

export const Task = ({id, title, isDone}: TasksType) => {
    return (
        <li>
            <input type = "checkbox" checked = {isDone}/>
            <span>{title}</span>
        </li>)

}