import React, {ChangeEvent} from "react";
import {TasksType} from "./TodoList";
import {Button} from "./Button";

type TaskType = {
    taskListId: string
    task: TasksType
    removeTask: (id: string) => void
    changeTaskStatus: (taskId: string, taskListId: string, isDone: boolean) => void
}

export const Task = ({taskListId, task, removeTask, changeTaskStatus}: TaskType) => {

    const onRemoveHandler = () => removeTask(task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.id, taskListId, e.currentTarget.checked)
    }

    return (
        <li className = {task.isDone ? 'is-done' : ''}>
            <Button title = {'X'} onClick = {onRemoveHandler}/>
            <input type = "checkbox" checked = {task.isDone} onChange = {onChangeHandler}/>
            <span>{task.title}</span>

        </li>)

}