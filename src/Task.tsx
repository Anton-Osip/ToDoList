import React from "react";
import {TasksType} from "./TodoList";
import {Button} from "./Button";

type TaskType = {
    task: TasksType
    removeTask: (id: string) => void
}

export const Task = ({task, removeTask}: TaskType) => {

    const onRemoveHandler = () => removeTask(task.id)

    return (
        <li>
            <Button title = {'X'} onClick = {onRemoveHandler}/>
            <input type = "checkbox" checked = {task.isDone}/>
            <span>{task.title}</span>

        </li>)

}