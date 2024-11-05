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
    removeTasks: (id: string) => void
    filterTasks: (value: FilterValue) => void
    addTask: (title: string) => void
}

export const TodoList = (props: Props) => {
    const {title, tasks, removeTasks, filterTasks, addTask} = props;

    const [text, setText] = useState<string>('');

    const mappedTasks = tasks.length ? tasks.map(task => {
        return <Task key = {task.id} {...task} removeTasks = {removeTasks}/>
    }) : <div>Нет данных</div>

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.currentTarget.value)
    }

    const addTaskHandler = () => {
        if (text) {
            addTask(text)
            setText('')
        }
    }

    const onClickHandler = () => {
        addTaskHandler()
    }

    const onKeyHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') addTaskHandler()
    }

    const changeFilterHandler = (filter: FilterValue) => {
        filterTasks(filter)
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value = {text} onChange = {onChangeHandler} onKeyDown = {onKeyHandler}/>
                <button onClick = {onClickHandler}>+</button>
            </div>
            <ul>
                {mappedTasks}
            </ul>
            <div>
                {/*<button onClick = {() => changeFilterHandler('All')}>All</button>*/}
                {/*<button onClick = {() => changeFilterHandler('Active')}>Active</button>*/}
                {/*<button onClick = {() => changeFilterHandler('Completed')}>Completed</button>*/}
                <Button onClick = {() => changeFilterHandler('All')} title = {'All'}/>
                <Button onClick = {() => changeFilterHandler('Active')} title = {'Active'}/>
                <Button onClick = {() => changeFilterHandler('Completed')} title = {'Completed'}/>
            </div>
        </div>
    )
}
