import { todolistsApi } from "../api/todolistsApi"
import { Dispatch } from "redux"
import { RequestStatus, setAppStatus } from "../../../app/app-reducer"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { ResultCode } from "common/enums/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { fetchTasksTC } from "./tasks-reducer"
import { createSlice } from "@reduxjs/toolkit"

export type FilterValue = "All" | "Active" | "Completed"

export type Todolist = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type DomainTodolist = Todolist & {
  filter: FilterValue
  entityStatus: RequestStatus
}

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: create => ({
    removeTodolist: create.reducer<{ id: string }>((state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    }),
    addTodolist: create.reducer<{ todolist: Todolist }>((state, action) => {
      state.unshift({ ...action.payload.todolist, filter: "All", entityStatus: "idle" })
    }),
    changeTodolistTitle: create.reducer<{ id: string; title: string }>((state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      if (index !== -1) {
        state[index].title = action.payload.title
      }
    }),
    changeTodolistEntityStatus: create.reducer<{ id: string; entityStatus: RequestStatus }>(
      (state, action) => {
        const todolist = state.find(tl => tl.id === action.payload.id)
        if (todolist) {
          todolist.entityStatus = action.payload.entityStatus
        }
      }
    ),
    setTodolists: create.reducer<{ todolists: Todolist[] }>(
      (_, action) => {
        const result: DomainTodolist[] = action.payload.todolists.map(tl => ({
          ...tl,
          filter: "All",
          entityStatus: "idle"
        }))
        return result

      }),
    clearTodolists: create.reducer(() => {
      return []
    }),
    changeTodoListFilter: create.reducer<{ id: string, filter: FilterValue }>(
      (state, action) => {
        const index = state.findIndex(tl => tl.id === action.payload.id)
        if (index !== -1) {
          state[index].filter = action.payload.filter
        }

      })
  }),
  selectors: {
    selectTodoLists: (state) => state
  }
})

export const {
  removeTodolist,
  addTodolist,
  changeTodolistEntityStatus,
  changeTodolistTitle,
  clearTodolists,
  setTodolists,
  changeTodoListFilter
} = todolistsSlice.actions

export const todolistsReducer = todolistsSlice.reducer
export const { selectTodoLists } = todolistsSlice.selectors

export const fetchTodolistsThunk = () => (dispatch: any) => {
  dispatch(setAppStatus({ status: "loading" }))
  todolistsApi.getTodolists()
    .then(res => {
      dispatch(setAppStatus({ status: "succeeded" }))
      dispatch(setTodolists({ todolists: res.data }))
      return res.data
    })
    .then((todoList) => {
      todoList.forEach(tl => {
        dispatch(fetchTasksTC(tl.id))
      })
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const addTodolistTC = (arg: { title: string }) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  todolistsApi.createTodolist(arg.title)
    .then((res => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(addTodolist({ todolist: { ...res.data.data.item } }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })).catch((error) => {
    handleServerNetworkError(error, dispatch)
  })
}

export const updateTodolistTitleTC =
  (arg: { id: string; title: string }) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    const { id, title } = arg
    todolistsApi.updateTodolist({ id, title })
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatus({ status: "succeeded" }))
          dispatch(changeTodolistTitle({ title, id }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      }).catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
  }

export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  dispatch(changeTodolistEntityStatus({ id, entityStatus: "loading" }))
  todolistsApi.deleteTodolist(id)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(removeTodolist({ id }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    }).catch((error) => {
    handleServerNetworkError(error, dispatch)
  })
}
