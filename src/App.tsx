import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilteredType = 'All' | 'Active' | 'Completed'

function App() {
    const [tasks, setTasks] = useState<TasksType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'TypeScript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ]);

    const addTask = (title:string) => {
        setTasks([{id: v1(), title: title, isDone: false}, ...tasks]);
    }

    const removeTask = (id: string) => {
        setTasks(tasks.filter((task) => task.id !== id));
    }

    const [filter, setFilter] = useState<FilteredType>('All')

    const changeFilter = (type: FilteredType) => {
        setFilter(type)
    }

    const filteredFoo = () => {
        switch (filter) {
            case 'All':
                return tasks;
            case 'Active':
                return tasks.filter((task) => !task.isDone)
            case 'Completed':
                return tasks.filter((task) => task.isDone)
        }
    }

    const filteredTasksForMap = filteredFoo()

    return (
        <div className = "App">
            <TodoList
                title = {"What to learn"}
                tasks = {filteredTasksForMap}
                removeTask = {removeTask}
                changeFilter = {changeFilter}
                addTask={addTask}
            />
        </div>
    )
}

export default App;
