import { AddTodolistAction, ClearTodolistAction, RemoveTodolistAction } from "./todolists-reducer"
import { Dispatch } from "redux"
import { tasksApi } from "../api/tasksApi"
import { DomainTask, UpdateTaskDomainModel, UpdateTaskModel } from "../api/tasksApi.types"
import { ResultCode, TaskPriority, TaskStatus } from "common/enums/enums"
import { RootState } from "../../../store"
import { setAppStatusAC } from "../../../app/app-reducer"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"

export type TasksState = {
  [key: string]: DomainTask[]
}

const initialState: TasksState = {}

export const tasksReducer = (
  state: TasksState = initialState,
  action: ActionsType
): TasksState => {
  switch (action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(
          (task) => task.id !== action.payload.taskId
        )
      }
    }
    case "ADD-TASK": {
      const newTask = {
        description: "",
        title: action.payload.title,
        status: TaskStatus.New,
        priority: TaskPriority.Hi,
        startDate: "",
        deadline: "",
        id: action.payload.taskId,
        todoListId: action.payload.todolistId,
        order: 0,
        addedDate: ""
      }
      return {
        ...state,
        [action.payload.todolistId]: [
          newTask,
          ...state[action.payload.todolistId]
        ]
      }
    }

    case "ADD-TODOLIST": {
      return { ...state, [action.payload.todolist.id]: [] }
    }

    case "REMOVE-TODOLIST": {
      delete state[action.payload.todoListId]
      return { ...state }
    }
    case "SET-TASKS": {
      const stateCopy = { ...state }
      stateCopy[action.payload.todolistId] = action.payload.tasks
      return stateCopy
    }
    case "UPDATE-TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? { ...task, ...action.payload.model } : task)
      }
    }
    case "CLEAR-TODOLIST": {
      return {}
    }

    default:
      return state
  }
}

// Action creators
export const removeTaskAC = (payload: {
  todolistId: string
  taskId: string
}) => {
  return { type: "REMOVE-TASK", payload } as const
}

export const addTaskAC = (payload: { taskId: string, todolistId: string; title: string }) => {
  return { type: "ADD-TASK", payload } as const
}

export const updateTaskAC = (payload: { todolistId: string, taskId: string, model: UpdateTaskModel }) => {
  return { type: "UPDATE-TASK", payload } as const
}

export const setTasksAC = (payload: { todolistId: string; tasks: DomainTask[] }) => {
  return {
    type: "SET-TASKS",
    payload
  } as const
}

// Actions types
export type RemoveTaskAC = ReturnType<typeof removeTaskAC>
export type AddTaskAC = ReturnType<typeof addTaskAC>
export type SetTasksAC = ReturnType<typeof setTasksAC>
export type UpdateTaskAC = ReturnType<typeof updateTaskAC>

type ActionsType =
  | RemoveTaskAC
  | AddTaskAC
  | AddTodolistAction
  | RemoveTodolistAction
  | SetTasksAC
  | UpdateTaskAC
  | ClearTodolistAction

export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  tasksApi.getTasks(todolistId)
    .then(res => {
      const tasks = res.data.items
      dispatch(setTasksAC({ todolistId, tasks }))
      dispatch(setAppStatusAC({ status: "succeeded" }))
    }).catch((error) => {
    handleServerNetworkError(error, dispatch)
  })
}

export const removeTaskTC = (arg: { taskId: string; todolistId: string }) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  tasksApi.deleteTask(arg)
    .then(res => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC({ status: "succeeded" }))
        dispatch(removeTaskAC(arg))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    }).catch((error) => {
    handleServerNetworkError(error, dispatch)
  })
}

export const addTaskTC = (arg: { title: string; todolistId: string }) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  tasksApi.createTask(arg)
    .then(res => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(addTaskAC({ taskId: res.data.data.item.id, todolistId: arg.todolistId, title: arg.title }))
        dispatch(setAppStatusAC({ status: "succeeded" }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    }).catch((error) => {
    handleServerNetworkError(error, dispatch)
  })

}

export const updateTaskTC = (arg: {
  taskId: string;
  todolistId: string;
  domainModel: UpdateTaskDomainModel
}) => (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  const { taskId, todolistId, domainModel } = arg

  const allTasksFromState = getState().tasks
  const tasksForCurrentTodolist = allTasksFromState[todolistId]
  const task = tasksForCurrentTodolist.find(t => t.id === taskId)

  if (task) {
    const model: UpdateTaskModel = {
      status: domainModel.status ? domainModel.status : task.status,
      title: domainModel.title ? domainModel.title : task.title,
      deadline: domainModel.deadline ? domainModel.deadline : task.deadline,
      description: domainModel.description ? domainModel.description : task.description,
      priority: domainModel.priority ? domainModel.priority : task.priority,
      startDate: domainModel.startDate ? domainModel.startDate : task.startDate
    }

    tasksApi.updateTaskTitle({ todolistId, taskId, model })
      .then((res) => {
        dispatch(setAppStatusAC({ status: "succeeded" }))
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(updateTaskAC({ todolistId, taskId, model }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      }).catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
  }
}


