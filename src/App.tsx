import React from 'react';
import './App.css';
import {TaskProps, TodoList} from "./TodoList";


export const App = () => {
    const title1 = "What to learn"
    const title2 = "Songs"

    const tasks1: TaskProps[] = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
    ]

    const tasks2: TaskProps[] = [
        // {id: 1, title: 'Hello world', isDone: true},
        // {id: 2, title: 'I am Happy', isDone: false},
        // {id: 3, title: 'Yo', isDone: false},
    ]

    return (
        <div className = "App">
            <TodoList title = {title1} tasks = {tasks1}/>
            <TodoList title = {title2} tasks = {tasks2}/>
        </div>
    );
}


