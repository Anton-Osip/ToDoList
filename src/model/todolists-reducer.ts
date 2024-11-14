import {v1} from 'uuid'
import {FilterValue, Todolist} from "../App";

export type RemoveTodolistAction = {
    type: 'REMOVE-TODOLIST'
    payload: {
        todoListId: string
    }
}

export type AddTodolistAction = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
    }
}

export type ChangeTodolistTitleAction = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        todoListId: string
        title: string
    }
}

export type ChangeTodolistFilterAction = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        todoListId: string
        filter: FilterValue
    }
}

type Actions =
    | RemoveTodolistAction
    | AddTodolistAction
    | ChangeTodolistTitleAction
    | ChangeTodolistFilterAction

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: Todolist[] = [
    {id: todolistID1, title: 'What to learn', filter: 'All'},
    {id: todolistID2, title: 'What to buy', filter: 'All'},
]

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todoListId)
        }
        case 'ADD-TODOLIST': {
            const newTodoListId = v1()
            const newTodoList: Todolist = {id: newTodoListId, title: action.payload.title, filter: 'All'}
            return [newTodoList, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.payload.todoListId ? {...tl, title: action.payload.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.payload.todoListId ? {...tl, filter: action.payload.filter} : tl)
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTodolistAC = (todoListId: string): RemoveTodolistAction => {
    return {type: 'REMOVE-TODOLIST', payload: {todoListId}} as const
}

export const addTodolistAC = (title: string): AddTodolistAction => {
    return {type: 'ADD-TODOLIST', payload: {title}} as const
}

export const changeTodoListTitle = (todoListId: string, title: string): ChangeTodolistTitleAction => {
    return {type: 'CHANGE-TODOLIST-TITLE', payload: {todoListId, title}} as const
}

export const changeTodoListFilter = (todoListId: string, filter: FilterValue): ChangeTodolistFilterAction => {
    return {type: 'CHANGE-TODOLIST-FILTER', payload: {todoListId, filter}} as const
}
