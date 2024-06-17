import React from 'react';
import './App.css';
import {TasksType, TodoList} from "./TodoList";

function App() {

    const tasks1: TasksType[] = [{id: 1, title: 'HTML&CSS', isDone: true}, {id: 2, title: 'JS', isDone: true}, {
        id: 3,
        title: 'ReactJS',
        isDone: false
    },]
    const tasks2: TasksType[] = [{id: 1, title: 'Hello world', isDone: true}, {
        id: 2,
        title: 'I am Happy',
        isDone: false
    }, {
        id: 3,
        title: 'Yo',
        isDone: false
    },]
    const tasks3: TasksType[] = []

    const title1 = "What to learn"
    const title2 = 'Movies'
    const title3 = 'null'

    return (
        <div className = "App">
            <TodoList title = {title1} tasks = {tasks1}/>
            <TodoList title = {title2} tasks = {tasks2}/>
            <TodoList title = {title3} tasks = {tasks3}/>
        </div>
    );
}

export default App;
