import {combineReducers, legacy_createStore as createStore} from 'redux'
import {todolistsReducer} from "./model/todolists-reducer";
import {tasksReducer} from "./model/tasks-reducer";

const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer)

export type RootState = ReturnType<typeof store.getState>

// @ts-ignore
window.store = store
