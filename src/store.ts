import { tasksReducer, tasksSlice } from "./features/todolists/model/tasks-reducer"
import { appReducer, appSlice } from "./app/app-reducer"
import { authReducer, authSlice } from "./features/auth/model/auth-reducer"
import { configureStore } from "@reduxjs/toolkit"
import { todolistsReducer, todolistsSlice } from "./features/todolists/model/todolists-reducer"

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
