import React, {useState} from 'react';
import './App.css';
import {TaskProps, TodoList} from "./TodoList";

export type FilterValue = 'All' | 'Active' | 'Completed'

export const App = () => {
    const title1 = "What to learn"
    const tasks1: TaskProps[] = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: true},
        {id: 5, title: 'JSX', isDone: true},
        {id: 6, title: 'RTK', isDone: false},
    ]
    const [tasks, setTasks] = useState<TaskProps[]>(tasks1);
    const [filter, setFilter] = useState<FilterValue>('All');


    const removeTasks = (id: number) => {
        setTasks(tasks.filter((task: TaskProps) => task.id !== id))
    }

    const filterTasks = (value: FilterValue) => {
        setFilter(value)
    }



    let filteredTasks = tasks
    if (filter === 'Active') filteredTasks=tasks.filter((task: TaskProps) => !task.isDone)
    if (filter === 'Completed') filteredTasks=tasks.filter((task: TaskProps) => task.isDone)

    return (
        <div className = "App">
            <TodoList title = {title1} tasks = {filteredTasks} removeTasks = {removeTasks} filterTasks = {filterTasks}/>
        </div>
    );
}


