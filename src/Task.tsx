import React from "react";
import {TasksType} from "./TodoList";
import {Button} from "./Button";

type TaskType = {
    task: TasksType
    removeTask: (id: number) => void
}

export const Task = ({task, removeTask}: TaskType) => {
    return (
        <li>
            <Button title = {'X'} onClick = {() => removeTask(task.id)}/>
            <input type = "checkbox" checked = {task.isDone}/>
            <span>{task.title}</span>

        </li>)

}