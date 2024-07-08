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
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    error: string | null
    setError: (err: string | null) => void
    filter: FilteredType
}

export function TodoList({
                             title,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             error,
                             setError, filter
                         }: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState<string>('');

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        addTask(newTaskTitle)
        setNewTaskTitle('')
    }
    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }


    const changeFilterHandler = (value: FilteredType) => changeFilter(value)


    const MapedTasks = (!tasks.length ?
        <p>Тасок нет</p> :
        <ul>
            {tasks.map((task) => {
                return (<Task key = {task.id} task = {task} removeTask = {removeTask}
                              changeTaskStatus = {changeTaskStatus}/>
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
                    onKeyDown = {onKeyDown}
                    className = {error ? 'error' : ''}/>
                <Button title = "+" onClick = {addTaskHandler}/>
                {error && <div className = {'error-message'}>{error}</div>}
            </div>
            {MapedTasks}
            <div>
                <Button title = "All" onClick = {() => {
                    changeFilterHandler("All")
                }} filter = {filter}/>
                <Button title = "Active" onClick = {() => {
                    changeFilterHandler("Active")
                }} filter = {filter}/>
                <Button title = "Completed" onClick = {() => {
                    changeFilterHandler("Completed")
                }} filter = {filter}/>
            </div>
        </div>
    )
}