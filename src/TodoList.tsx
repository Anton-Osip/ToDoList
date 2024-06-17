import React from "react";
import {Task} from "./Task";
import {Button} from "./Button";

export type TasksType = { id: number, title: string, isDone: boolean }
type PropsType = { title: string, tasks: TasksType[] }

export function TodoList({title, tasks}: PropsType) {
    const MapedTasks = (!tasks.length ?
        <p>Тасок нет</p> :
        <ul>
            {tasks.map((task) => {
                return (<Task key = {task.id} {...task} />
                )
            })}
        </ul>)

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            {MapedTasks}
            <div>
                <Button title = "All"/>
                <Button title = "Active"/>
                <Button title = "Completed"/>
            </div>
        </div>
    )
}