import { tasksReducer, tasksSlice } from "./features/todolists/model/tasks-reducer"
import { appReducer, appSlice } from "./app/app-reducer"
import { configureStore } from "@reduxjs/toolkit"
import { todolistsReducer, todolistsSlice } from "./features/todolists/model/todolists-reducer"
import { setupListeners } from "@reduxjs/toolkit/query"
import { baseApi } from "./app/baseApi"

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    [baseApi.reducerPath]: baseApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(baseApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
