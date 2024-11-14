import {FilterValue, Todolist} from "../App";

const initialState: Todolist[] = []

export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todoListId)
        }
        case 'ADD-TODOLIST': {
            const newTodoList: Todolist = {id: action.payload.newTodoListId, title: action.payload.title, filter: 'All'}
            return [newTodoList, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.payload.todoListId ? {...tl, title: action.payload.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.payload.todoListId ? {...tl, filter: action.payload.filter} : tl)
        }
        default:
            return state
    }
}

export const removeTodolistAC = (payload: { todoListId: string }) => {
    return {type: 'REMOVE-TODOLIST', payload} as const
}

export const addTodolistAC = (payload: { title: string, newTodoListId: string }) => {
    return {type: 'ADD-TODOLIST', payload} as const
}

export const changeTodoListTitle = (payload: { todoListId: string, title: string }) => {
    return {type: 'CHANGE-TODOLIST-TITLE', payload} as const
}

export const changeTodoListFilter = (payload: { todoListId: string, filter: FilterValue }) => {
    return {type: 'CHANGE-TODOLIST-FILTER', payload} as const
}

export type RemoveTodolistAction = ReturnType<typeof removeTodolistAC>
export type AddTodolistAction = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleAction = ReturnType<typeof changeTodoListTitle>
type ChangeTodolistFilterAction = ReturnType<typeof changeTodoListFilter>

type Actions =
    | RemoveTodolistAction
    | AddTodolistAction
    | ChangeTodolistTitleAction
    | ChangeTodolistFilterAction
