import React, {ChangeEvent} from "react";
import {TasksType} from "./TodoList";
import {Button} from "./Button";

type TaskType = {
    task: TasksType
    removeTask: (id: string) => void
    changeTaskStatus:(taskId: string, isDone: boolean)=>void
}

export const Task = ({task, removeTask,changeTaskStatus}: TaskType) => {

    const onRemoveHandler = () => removeTask(task.id)
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.id,e.currentTarget.checked)
    }

    return (
        <li className={task.isDone?'is-done':''}>
            <Button title = {'X'} onClick = {onRemoveHandler}/>
            <input type = "checkbox" checked = {task.isDone} onChange = {onChangeHandler}/>
            <span>{task.title}</span>

        </li>)

}