import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import {Task} from "./Task";
import {FilterValue} from "./App";
import {Button} from "./Button";

export type TaskProps = {
    id: string
    title: string
    isDone: boolean
};

type Props = {
    title: string
    tasks: TaskProps[]
    filter: FilterValue
    todoListId: string
    removeTasks: (todolistId: string, taskId: string) => void
    filterTasks: (todoListId: string, filter: FilterValue) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodoList: (todolistId: string) => void
}

export const TodoList = (props: Props) => {
    const {
        title,
        tasks,
        filter,
        todoListId,
        removeTasks,
        filterTasks,
        addTask,
        changeTaskStatus,
        removeTodoList
    } = props;

    const [text, setText] = useState<string>('');
    const [error, setError] = useState<string | null>(null);


    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.currentTarget.value)
        setError(null)
    }

    const addTaskHandler = () => {
        if (text.trim()) {
            addTask(todoListId, text.trim())
            setText('')
        } else {
            setError('Title is required')
        }
    }

    const onClickHandler = () => {
        addTaskHandler()
    }

    const onKeyHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const changeFilterHandler = (filter: FilterValue) => {
        filterTasks(todoListId, filter)
    }
    const removeTodoListHandler = () => {
        removeTodoList(todoListId)
    }


    let filteredTasks = tasks
    if (filter === 'Active') filteredTasks = tasks.filter((task: TaskProps) => !task.isDone)
    if (filter === 'Completed') filteredTasks = tasks.filter((task: TaskProps) => task.isDone)

    const mappedTasks = filteredTasks.length ? filteredTasks.map(task => {
        return <Task key = {task.id} {...task} todoListId = {todoListId} removeTasks = {removeTasks}
                     changeTaskStatus = {changeTaskStatus}/>
    }) : <div>Нет данных</div>

    return (
        <div>
            <h3>{title}
                <Button
                    onClick = {removeTodoListHandler}
                    title = {"X"}/>
            </h3>
            <div>
                <input className = {error ? 'error' : ''} value = {text} onChange = {onChangeHandler}
                       onKeyDown = {onKeyHandler}/>
                <button onClick = {onClickHandler}>+</button>
                {error && <div className = {'error-message'}>{error}</div>}
            </div>
            <ul>
                {mappedTasks}
            </ul>
            <div>
                {/*<button onClick = {() => changeFilterHandler('All')}>All</button>*/}
                {/*<button onClick = {() => changeFilterHandler('Active')}>Active</button>*/}
                {/*<button onClick = {() => changeFilterHandler('Completed')}>Completed</button>*/}
                <Button onClick = {() => changeFilterHandler('All')}
                        title = {'All'}
                        className = {filter === 'All' ? 'active-filter' : ''}/>
                <Button onClick = {() => changeFilterHandler('Active')}
                        title = {'Active'}
                        className = {filter === 'Active' ? 'active-filter' : ''}/>
                <Button onClick = {() => changeFilterHandler('Completed')}
                        title = {'Completed'}
                        className = {filter === 'Completed' ? 'active-filter' : ''}/>
            </div>
        </div>
    )
}
