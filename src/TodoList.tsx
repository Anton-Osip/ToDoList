import React, {useState} from "react";
import {Task} from "./Task";
import {Button} from "./Button";
import {FilteredType} from "./App";

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: TasksType[]
    removeTask: (id: number) => void
    changeFilter: (title: FilteredType) => void
}

export function TodoList({title, tasks, removeTask,changeFilter }: PropsType) {



    const MapedTasks = (!tasks.length ?
        <p>Тасок нет</p> :
        <ul>
            {tasks.map((task) => {
                return (<Task key = {task.id} task = {task} removeTask = {removeTask}/>
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
                <Button title = "All" onClick = {() => {
                    changeFilter('All')
                }}/>
                <Button title = "Active" onClick = {() => {
                    changeFilter('Active')
                }}/>
                <Button title = "Completed" onClick = {() => {
                    changeFilter('Completed')
                }}/>
            </div>
        </div>
    )
}