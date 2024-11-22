import { todolistsApi } from "../api/todolistsApi"
import { Dispatch } from "redux"
import { RequestStatus, setAppStatusAC } from "../../../app/app-reducer"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { ResultCode } from "common/enums/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { fetchTasksTC } from "./tasks-reducer"

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

const initialState: DomainTodolist[] = []

export const todolistsReducer = (
  state: DomainTodolist[] = initialState,
  action: Actions
): DomainTodolist[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.payload.todoListId)
    }
    case "ADD-TODOLIST": {
      return [action.payload.todolist, ...state]
    }
    case "CHANGE-TODOLIST-TITLE": {
      return state.map((tl) =>
        tl.id === action.payload.todoListId
          ? { ...tl, title: action.payload.title }
          : tl
      )
    }
    case "CHANGE-TODOLIST-FILTER": {
      return state.map((tl) =>
        tl.id === action.payload.todoListId
          ? { ...tl, filter: action.payload.filter }
          : tl
      )
    }
    case "SET-TODOLISTS": {
      return action.todolists.map(tl => ({ ...tl, filter: "All" }))
    }
    case "CHANGE-TODOLIST-ENTITY-STATUS": {
      return state.map(tl => tl.id === action.payload.todoListId ? {
        ...tl,
        entityStatus: action.payload.entityStatus
      } : tl)
    }
    case "CLEAR-TODOLIST": {
      return []
    }
    default:
      return state
  }
}

export const removeTodolistAC = (payload: { todoListId: string }) => {
  return { type: "REMOVE-TODOLIST", payload } as const
}

export const addTodolistAC = (payload: {
  todolist: DomainTodolist
}) => {
  return { type: "ADD-TODOLIST", payload } as const
}

export const changeTodoListTitle = (payload: {
  todoListId: string
  title: string
}) => {
  return { type: "CHANGE-TODOLIST-TITLE", payload } as const
}

export const changeTodoListFilter = (payload: {
  todoListId: string
  filter: FilterValue
}) => {
  return { type: "CHANGE-TODOLIST-FILTER", payload } as const
}

export const setTodolistsAC = (payload: { todolists: DomainTodolist[] }) => {
  return { type: "SET-TODOLISTS", todolists: payload.todolists } as const
}

export const changeTodolistEntityStatusAC = (payload: {
  todoListId: string
  entityStatus: RequestStatus
}) => {
  return { type: "CHANGE-TODOLIST-ENTITY-STATUS", payload } as const
}

export const clearTodolistAC = () => {
  return { type: "CLEAR-TODOLIST" } as const
}


export type SetTodolistsAction = ReturnType<typeof setTodolistsAC>
export type RemoveTodolistAction = ReturnType<typeof removeTodolistAC>
export type AddTodolistAction = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleAction = ReturnType<typeof changeTodoListTitle>
type ChangeTodolistFilterAction = ReturnType<typeof changeTodoListFilter>
type ChangeTodolistEntityStatusAction = ReturnType<typeof changeTodolistEntityStatusAC>
export type ClearTodolistAction = ReturnType<typeof clearTodolistAC>

type Actions =
  | RemoveTodolistAction
  | AddTodolistAction
  | ChangeTodolistTitleAction
  | ChangeTodolistFilterAction
  | SetTodolistsAction
  | ChangeTodolistEntityStatusAction
  | ClearTodolistAction


export const fetchTodolistsThunk = () => (dispatch: any) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  todolistsApi.getTodolists()
    .then(res => {
      dispatch(setAppStatusAC({ status: "succeeded" }))
      dispatch(setTodolistsAC({ todolists: res.data }))
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
  dispatch(setAppStatusAC({ status: "loading" }))
  todolistsApi.createTodolist(arg.title)
    .then((res => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC({ status: "succeeded" }))
        dispatch(addTodolistAC({ todolist: { ...res.data.data.item, filter: "All", entityStatus: "idle" } }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })).catch((error) => {
    handleServerNetworkError(error, dispatch)
  })
}

export const updateTodolistTitleTC =
  (arg: { id: string; title: string }) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({ status: "loading" }))
    const { id, title } = arg
    todolistsApi.updateTodolist({ id, title })
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatusAC({ status: "succeeded" }))
          dispatch(changeTodoListTitle({ title, todoListId: id }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      }).catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
  }

export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  dispatch(changeTodolistEntityStatusAC({ todoListId: id, entityStatus: "loading" }))
  todolistsApi.deleteTodolist(id)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC({ status: "succeeded" }))
        dispatch(removeTodolistAC({ todoListId: id }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    }).catch((error) => {
    handleServerNetworkError(error, dispatch)
  })
}
