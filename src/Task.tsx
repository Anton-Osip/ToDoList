import React from "react";
import {TaskProps} from "./TodoList";


export const Task = ({ isDone, title}: TaskProps) => {
    return (<li ><input type = "checkbox" checked = {isDone}/>
        <span>{title}</span></li>)
}
