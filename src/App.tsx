import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [todoListId: string]: TaskType[]
}
export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    const todoListId1 = v1()
    const todoListId2 = v1()
    const todoListInitial: TodoListType[] = [
        {id: todoListId1, title: '"What to learn"', filter: "active"},
        {id: todoListId2, title: '"What to do"', filter: "completed"},
    ]
    const allTasksInitial: TasksStateType = {
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
    const [tasks, setTasks] = useState<TasksStateType>(allTasksInitial);

    const removeTask = (todoListId: string, taskId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(task => task.id !== taskId)});
    }
    const addTask = (todoListId: string, title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    const changeTaskStatus = (todoListId: string, taskId: string, taskStatus: boolean) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(task => task.id !== taskId ? task : {...task, isDone: taskStatus})
        })
    }
    const changeFilter = (todoListId: string, filter: FilterValuesType) => {
        setTodoLists(todoLists.map(todoList => todoList.id === todoListId ? {
            ...todoList,
            filter: filter
        } : todoList))
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(todo => todo.id !== todoListId))
        delete tasks[todoListId]
    }

    const todoListsComponents = todoLists.map((todoList: TodoListType) => {
        let tasksForTodolist = tasks[todoList.id];
        if (todoList.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
        }
        if (todoList.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
        }

        return (
            <Todolist
                key = {todoList.id}
                todoListId = {todoList.id}
                title = {todoList.title}
                tasks = {tasksForTodolist}
                filter = {todoList.filter}
                removeTask = {removeTask}
                changeFilter = {changeFilter}
                addTask = {addTask}
                changeTaskStatus = {changeTaskStatus}
                removeTodoList = {removeTodoList}

            />
        )
    })

    return (
        <div className = "App">
            {todoListsComponents}
        </div>
    );
}

export default App;
