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
    const [filter, setFilter] = useState<FilteredType>('All')
    const [error, setError] = useState<string | null>(null)

    const changeStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(el => el.id === taskId ? {
                    ...el, isDone: isDone
                } :
                el
        ))

    }

    const addTask = (title: string) => {
        if (title.trim()) {
            setTasks([{id: v1(), title: title.trim(), isDone: false}, ...tasks]);
        } else {
            setError('title is required')
        }
    }

    const removeTask = (id: string) => {
        setTasks(tasks.filter((task) => task.id !== id));
    }


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

    const onChangeError = (err: string | null) => {
        setError(err)
    }

    return (
        <div className = "App">
            <TodoList
                title = {"What to learn"}
                tasks = {filteredTasksForMap}
                removeTask = {removeTask}
                changeFilter = {changeFilter}
                addTask = {addTask}
                changeTaskStatus = {changeStatus}
                error = {error}
                setError = {onChangeError}
                filter = {filter}
            />
        </div>
    )
}

export default App;
