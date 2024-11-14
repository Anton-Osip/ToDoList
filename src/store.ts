import {combineReducers, legacy_createStore as createStore} from 'redux'
import {todolistsReducer} from "./features/todolists/model/todolists-reducer";
import {tasksReducer} from "./features/todolists/model/tasks-reducer";
import {appReducer} from "./app/app-reducer";

const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer,
    app:appReducer
})

export const store = createStore(rootReducer)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store
