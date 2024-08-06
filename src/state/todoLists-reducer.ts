import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodoListActionType = {
    type: 'ADD-TODOLIST',
    title: string
}
export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    title: string
    id: string
}
export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionTypes =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType

export const todoListsReducer = (state: TodolistType[], action: ActionTypes): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(s => s.id === action.id ? {...s, title: action.title} : s)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(s => s.id === action.id ? {...s, filter: action.filter} : s)
        default:
            throw new Error(`Unknown action type`)
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: id}
}
export const AddTodoListAC = (title: string): AddTodoListActionType => {
    return {type: "ADD-TODOLIST", title: title}
}
export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", title, id}
}
export const ChangeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", filter, id}
}
