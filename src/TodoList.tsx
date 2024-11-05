import React from "react";
import {Task} from "./Task";
import {FilterValue} from "./App";

export type TaskProps = {
    id: number
    title: string
    isDone: boolean
};

type Props = {
    title: string
    tasks: TaskProps[]
    removeTasks: (id: number) => void
    filterTasks: (value:FilterValue) => void
}

export const TodoList = (props: Props) => {
    const {title, tasks, removeTasks, filterTasks} = props;

    const mappedTasks = tasks.length ? tasks.map(task => {
        return <Task key = {task.id} {...task} removeTasks = {removeTasks}/>
    }) : <div>Нет данных</div>

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {mappedTasks}
            </ul>
            <div>
                <button onClick = {() => filterTasks('All')}>All</button>
                <button onClick = {() => filterTasks('Active')}>Active</button>
                <button onClick = {() => filterTasks('Completed')}>Completed</button>
                {/*<Button title = {'All'}/>*/}
                {/*<Button title = {'Active'}/>*/}
                {/*<Button title = {'Completed'}/>*/}
            </div>
        </div>
    )
}
