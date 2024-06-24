import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./TodoList";

export type FilteredType = 'All' | 'Active' | 'Completed'

function App() {
    const [tasks, setTasks] = useState<TasksType[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'TypeScript', isDone: false},
        {id: 6, title: 'RTK query', isDone: false},
    ]);

    const removeTask = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id));
    }

    const [filter, setFilter] = useState<FilteredType>('All')

    const changeFilter = (type: FilteredType) => {
        setFilter(type)
    }

    const filteredFoo = () => {
        switch (filter) {
            case 'All':return tasks;
            case 'Active':return tasks.filter((task) => !task.isDone)
            case 'Completed':return tasks.filter((task) => task.isDone)
        }
    }

    const filteredTasksForMap=filteredFoo()

    return (
        <div className = "App">
            <TodoList
                title = {"What to learn"}
                tasks = {filteredTasksForMap}
                removeTask = {removeTask}
                changeFilter = {changeFilter}
            />
        </div>
    )
}

export default App;
