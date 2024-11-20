import { applyMiddleware, combineReducers, legacy_createStore as createStore, UnknownAction } from "redux"
import { todolistsReducer } from "./features/todolists/model/todolists-reducer"
import { tasksReducer } from "./features/todolists/model/tasks-reducer"
import { appReducer } from "./app/app-reducer"
import { thunk, ThunkDispatch } from "redux-thunk"

const rootReducer = combineReducers({
  todoLists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer
})

export const store = createStore(rootReducer, {}, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>

// @ts-ignore
window.store = store
