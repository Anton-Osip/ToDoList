import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Task} from "./Task";
import {Button} from "./Button";
import {FilteredType} from "./App";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: TasksType[]
    removeTask: (id: string) => void
    changeFilter: (title: FilteredType) => void
    addTask: (title: string) => void
}

export function TodoList({title, tasks, removeTask, changeFilter, addTask}: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState<string>('');

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        addTask(newTaskTitle)
        setNewTaskTitle('')
    }
    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }


    const changeFilterHandler = (value: FilteredType) => changeFilter(value)


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
                <input
                    value = {newTaskTitle}
                    onChange = {onNewTitleChangeHandler}
                    onKeyDown = {onKeyDown}/>
                <Button title = "+" onClick = {addTaskHandler}/>

            </div>
            {MapedTasks}
            <div>
                <Button title = "All" onClick = {() => {
                    changeFilterHandler("All")
                }}/>
                <Button title = "Active" onClick = {() => {
                    changeFilterHandler("Active")
                }}/>
                <Button title = "Completed" onClick = {() => {
                    changeFilterHandler("Completed")
                }}/>
            </div>
        </div>
    )
}