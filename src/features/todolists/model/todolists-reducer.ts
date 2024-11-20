import { todolistsApi } from "../api/todolistsApi"
import { Dispatch } from "redux"

export type FilterValue = "All" | "Active" | "Completed"

export type Todolist = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type DomainTodolist = Todolist & {
  filter: FilterValue
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

export type SetTodolistsAction = ReturnType<typeof setTodolistsAC>
export type RemoveTodolistAction = ReturnType<typeof removeTodolistAC>
export type AddTodolistAction = ReturnType<typeof addTodolistAC>
type ChangeTodolistTitleAction = ReturnType<typeof changeTodoListTitle>
type ChangeTodolistFilterAction = ReturnType<typeof changeTodoListFilter>

type Actions =
  | RemoveTodolistAction
  | AddTodolistAction
  | ChangeTodolistTitleAction
  | ChangeTodolistFilterAction
  | SetTodolistsAction


export const fetchTodolistsThunk = () => (dispatch: Dispatch) => {
  todolistsApi.getTodolists().then(res => {
    dispatch(setTodolistsAC({ todolists: res.data }))
  })
}

export const addTodolistTC = (arg: { title: string }) => (dispatch: Dispatch) => {
  todolistsApi.createTodolist(arg.title)
    .then((res => {
      dispatch(addTodolistAC({ todolist: { ...res.data.data.item, filter: "All" } }))
    }))
}

export const updateTodolistTitleTC =
  (arg: { id: string; title: string }) => (dispatch: Dispatch) => {
    const { id, title } = arg
    todolistsApi.updateTodolist({ id, title })
      .then(() => {
        dispatch(changeTodoListTitle({ title, todoListId: id }))
      })
  }
