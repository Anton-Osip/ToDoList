import { todolistsAPI, TodolistType } from 'api/todolists-api'
import { handleServerNetworkError } from 'utils/handle-server-network-error '
import { AppThunk } from 'app/store'
import { RequestStatusType, setAppStatus } from 'app/app-reducer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { setIsLoggedIn } from 'features/Login/auth-reducer'
import { tasksThunks } from 'features/TodolistsList/tasks-reducer'

const slice = createSlice({
  name: 'todolists',
  initialState: [] as TodolistDomainType[],
  reducers: {
    removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
      let index = state.findIndex(tl => tl.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
    },
    changeTodolistTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      let index = state.findIndex(tl => tl.id === action.payload.id)
      if (index !== -1) {
        state[index].title = action.payload.title
      }
    },
    changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      let index = state.findIndex(tl => tl.id === action.payload.id)
      if (index !== -1) {
        state[index].filter = action.payload.filter
      }
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) => {
      let index = state.findIndex(tl => tl.id === action.payload.id)
      if (index !== -1) {
        state[index].entityStatus = action.payload.entityStatus
      }
    },
    setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
      action.payload.todolists.forEach((tl: TodolistType) => {
        state.unshift({ ...tl, filter: 'all', entityStatus: 'idle' })
      })
    },
  },
  extraReducers: builder => {
    builder.addCase(setIsLoggedIn, () => {
      return []
    })
  },
})

export const todolistsReducer = slice.reducer
export const {
  changeTodolistEntityStatus,
  changeTodolistFilter,
  changeTodolistTitle,
  addTodolist,
  setTodolists,
  removeTodolist,
} = slice.actions

// thunks
export const fetchTodolistsTC = (): AppThunk => {
  return dispatch => {
    dispatch(setAppStatus({ status: 'loading' }))
    todolistsAPI
      .getTodolists()
      .then(res => {
        dispatch(setTodolists({ todolists: res.data }))
        dispatch(setAppStatus({ status: 'succeeded' }))
        return res.data
      })
      .then(res => {
        res.forEach((tl: TodolistType) => {
          dispatch(tasksThunks.fetchTasks(tl.id))
        })
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch)
      })
  }
}
export const removeTodolistTC = (todolistId: string): AppThunk => {
  return dispatch => {
    dispatch(setAppStatus({ status: 'loading' }))
    dispatch(changeTodolistEntityStatus({ id: todolistId, entityStatus: 'loading' }))
    todolistsAPI.deleteTodolist(todolistId).then(() => {
      dispatch(removeTodolist({ id: todolistId }))
      dispatch(setAppStatus({ status: 'succeeded' }))
    })
  }
}
export const addTodolistTC = (title: string): AppThunk => {
  return dispatch => {
    dispatch(setAppStatus({ status: 'loading' }))
    todolistsAPI.createTodolist(title).then(res => {
      dispatch(addTodolist({ todolist: res.data.data.item }))
      dispatch(setAppStatus({ status: 'succeeded' }))
    })
  }
}
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => {
  return dispatch => {
    todolistsAPI.updateTodolist(id, title).then(() => {
      dispatch(changeTodolistTitle({ id: id, title: title }))
    })
  }
}

// types
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
