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
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (title: FilteredType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, taskListId: string, isDone: boolean) => void
    filter: FilteredType
    id: string
    removeTodoList:(id:string) => void
}

export function TodoList(props: PropsType) {
    const {
        title, tasks, changeFilter, filter, id, removeTask, addTask, changeTaskStatus
    ,...anyProps} = props

    const [error, setError] = useState<string | null>(null)
    const [newTaskTitle, setNewTaskTitle] = useState<string>('');

    const onChangeError = (err: string | null) => {
        setError(err)
    }
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeError(null)
        setNewTaskTitle(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        if (newTaskTitle.trim()) {
            addTask(newTaskTitle, id)
            setNewTaskTitle('')
        } else {
            onChangeError('title is required')
        }
    }
    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        onChangeError(null)
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }


    const changeFilterHandler = (value: FilteredType, id: string) => changeFilter(value, id)

    const removeTodoList = () => {
        anyProps.removeTodoList(id)
    }
    const MapedTasks = (!tasks.length ?
        <p>Тасок нет</p> :
        <ul>
            {tasks.map((task) => {
                return (<Task key = {task.id} taskListId = {id} task = {task} removeTask = {() => {
                        removeTask(task.id, id)
                    }}
                              changeTaskStatus = {changeTaskStatus}
                    />
                )
            })}
        </ul>)

    return (
        <div>
            <h3><Button title = {'x'} onClick = {removeTodoList}/>{title}</h3>
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
                <Button title = "all" onClick = {() => {
                    changeFilterHandler("all", id)
                }} filter = {filter}/>
                <Button title = "active" onClick = {() => {
                    changeFilterHandler("active", id)
                }} filter = {filter}/>
                <Button title = "completed" onClick = {() => {
                    changeFilterHandler("completed", id)
                }} filter = {filter}/>
            </div>
        </div>
    )
}