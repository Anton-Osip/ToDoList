import {TasksState} from '../App'
import {v1} from "uuid";
import {AddTodolistAction, RemoveTodolistAction} from "./todolists-reducer";

export const tasksReducer = (state: TasksState, action: ActionsType): TasksState => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            }
        }
        case "ADD-TASK": {
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
                    ...task,
                    isDone: action.payload.isDone
                } : task)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => (t.id === action.payload.taskId ? {
                    ...t,
                    title: action.payload.title
                } : t)),
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.payload.newTodoListId]: []}
        }

        case "REMOVE-TODOLIST": {
            delete state[action.payload.todoListId]
            return {...state}
        }

        default:
            throw new Error("I don't understand this type")
    }
}

// Action creators
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', payload: {todolistId, taskId}} as const
}

export const addTaskAC = (todolistId: string, title: string) => {
    return {type: 'ADD-TASK', payload: {todolistId, title}} as const
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {type: 'CHANGE-TASK-STATUS', payload: {todolistId, taskId, isDone}} as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {type: 'CHANGE-TASK-TITLE', payload: {todolistId, taskId, title}} as const
}


// Actions types
export type RemoveTaskAC = ReturnType<typeof removeTaskAC>
export type AddTaskAC = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusAC = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleAC = ReturnType<typeof changeTaskTitleAC>

type ActionsType =
    RemoveTaskAC
    | AddTaskAC
    | ChangeTaskStatusAC
    | ChangeTaskTitleAC
    | AddTodolistAction
    | RemoveTodolistAction
