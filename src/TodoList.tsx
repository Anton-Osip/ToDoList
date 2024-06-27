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

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }

    const onClickHandler = () => {
        addTask(newTaskTitle)
        setNewTaskTitle('')
    }

    const onaAlClickHandler = () => changeFilter('All')
    const onActiveClickHandler = () => changeFilter('Active')
    const onCompletedClickHandler = () => changeFilter('Completed')

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
                <button onClick = {onClickHandler}>+
                </button>
            </div>
            {MapedTasks}
            <div>
                <Button title = "All" onClick = {onaAlClickHandler}/>
                <Button title = "Active" onClick = {onActiveClickHandler}/>
                <Button title = "Completed" onClick = {onCompletedClickHandler}/>
            </div>
        </div>
    )
}