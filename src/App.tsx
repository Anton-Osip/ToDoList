import React, {useState} from 'react';
import './App.css';
import {TaskProps, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValue = 'All' | 'Active' | 'Completed'

export const App = () => {
    const title1 = "What to learn"
    const tasks1: TaskProps[] = [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: true},
        {id: v1(), title: 'JSX', isDone: true},
        {id: v1(), title: 'RTK', isDone: false},
    ]
    const [tasks, setTasks] = useState<TaskProps[]>(tasks1);
    const [filter, setFilter] = useState<FilterValue>('All');


    const removeTasks = (id: string) => {
        setTasks(tasks.filter((task: TaskProps) => task.id !== id))
    }

    const filterTasks = (value: FilterValue) => {
        setFilter(value)
    }

    const addTask = (title: string) => {
        const newTasks = {id: v1(), title, isDone: false}
        setTasks([newTasks, ...tasks])
    }


    let filteredTasks = tasks
    if (filter === 'Active') filteredTasks = tasks.filter((task: TaskProps) => !task.isDone)
    if (filter === 'Completed') filteredTasks = tasks.filter((task: TaskProps) => task.isDone)

    return (
        <div className = "App">
            <TodoList
                title = {title1}
                tasks = {filteredTasks}
                removeTasks = {removeTasks}
                filterTasks = {filterTasks}
                addTask = {addTask}/>
        </div>
    );
}


