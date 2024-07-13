import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilteredType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilteredType
}


function App() {

    const todoListId1 = v1()
    const todoListId2 = v1()

    const todoListInitial: TodoListType[] = [
        {id: todoListId1, title: '"What to learn"', filter: "active"},
        {id: todoListId2, title: '"What to do"', filter: "completed"},
    ]

    const allTasksInitial = {
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'TypeScript', isDone: false},
            {id: v1(), title: 'RTK query', isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'TypeScript', isDone: false},
            {id: v1(), title: 'RTK query', isDone: false},
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Milk', isDone: false},
        ]
    }

    const [todoLists, setTodoLists] = useState<TodoListType[]>(todoListInitial);
    const [tasks, setTasks] = useState<any>(allTasksInitial);


    const changeStatus = (taskId: string, todoListId: string, isDone: boolean) => {
        let task = tasks[todoListId]
        const newTasks = task.map((el: any) => el.id === taskId ? {
                    ...el, isDone: isDone
                } :
                el
        )
        tasks[todoListId] = newTasks
        setTasks({...tasks});
    }

    const addTask = (title: string, todoListId: string) => {
        let newTask = {id: v1(), title: title.trim(), isDone: false}
        let task = tasks[todoListId]
        const newTasks = [newTask, ...task]
        tasks[todoListId] = newTasks
        setTasks({...tasks});

    }

    const removeTask = (id: string, todoListId: string) => {
        let task = tasks[todoListId]
        tasks[todoListId] = task.filter((task: TasksType) => task.id !== id)
        setTasks({...tasks});
    }

    const changeFilter = (type: FilteredType, todoListId: string) => {
        let todoList = todoLists.find(el => el.id === todoListId);
        if (todoList) {
            todoList.filter = type
            setTodoLists([...todoLists])
        }
    }

    const filteredFoo = (filter: FilteredType, id: string) => {
        switch (filter) {
            case 'all':
                return tasks[id];
            case 'active':
                return tasks[id].filter((t: any) => !t.isDone)
            case 'completed':
                return tasks[id].filter((t: any) => t.isDone)
        }
    }

    const removeTodoList = (id: string) => {
        let newTodoList = todoLists.filter((el: any) => el.id !== id)
        setTodoLists(newTodoList)
        delete tasks[id]
        setTasks({...tasks})

        // let task = tasks[id]
        // task=[]
        // tasks[id]=task
        // setTasks({...tasks})
    }

    return (
        <div className = "App">
            {todoLists.map(tl => {
                const taskForTodoList = filteredFoo(tl.filter, tl.id)

                return (
                    <TodoList
                        key = {tl.id}
                        id = {tl.id}
                        title = {tl.title}
                        tasks = {taskForTodoList}
                        changeFilter = {changeFilter}
                        filter = {tl.filter}
                        removeTask = {removeTask}
                        addTask = {addTask}
                        changeTaskStatus = {changeStatus}
                        removeTodoList = {removeTodoList}

                    />
                )
            })
            }

        </div>
    )
}

export default App;
