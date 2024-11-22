import { Dispatch } from "redux"
import { tasksApi } from "../api/tasksApi"
import { DomainTask, UpdateTaskDomainModel, UpdateTaskModel } from "../api/tasksApi.types"
import { ResultCode } from "common/enums/enums"
import { RootState } from "../../../store"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { setAppStatus } from "../../../app/app-reducer"
import { createSlice } from "@reduxjs/toolkit"
import { addTodolist, removeTodolist } from "./todolists-reducer"

export type TasksState = {
  [key: string]: DomainTask[]
}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksState,
  reducers: create => ({
    setTasks: create.reducer<{ todolistId: string; tasks: DomainTask[] }>((state, action) => {
      state[action.payload.todolistId] = action.payload.tasks
    }),
    removeTask: create.reducer<{ taskId: string; todolistId: string }>((state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(t => t.id === action.payload.taskId)
      if (index !== -1) {
        tasks.splice(index, 1)
      }
    }),
    addTask: create.reducer<{ task: DomainTask }>((state, action) => {
      const tasks = state[action.payload.task.todoListId]
      tasks.unshift(action.payload.task)
    }),
    updateTask: create.reducer<{
      taskId: string
      todolistId: string
      domainModel: UpdateTaskDomainModel
    }>((state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(t => t.id === action.payload.taskId)
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...action.payload.domainModel }
      }
    }),
    clearTasks: create.reducer(() => {
      return {}
    })
  }),
  extraReducers: builder => {
    builder
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.id]
      })
  },
  selectors: {
    selectTasks: (state) => state
  }
})

export const { setTasks, addTask, clearTasks, removeTask, updateTask } = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
export const { selectTasks } = tasksSlice.selectors


export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  tasksApi.getTasks(todolistId)
    .then(res => {
      const tasks = res.data.items
      dispatch(setTasks({ todolistId, tasks }))
      dispatch(setAppStatus({ status: "succeeded" }))
    }).catch((error) => {
    handleServerNetworkError(error, dispatch)
  })
}

export const removeTaskTC = (arg: { taskId: string; todolistId: string }) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  tasksApi.deleteTask(arg)
    .then(res => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(removeTask(arg))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    }).catch((error) => {
    handleServerNetworkError(error, dispatch)
  })
}

export const addTaskTC = (arg: { title: string; todolistId: string }) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  tasksApi.createTask(arg)
    .then(res => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(addTask({ task: res.data.data.item }))
        dispatch(setAppStatus({ status: "succeeded" }))
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
  dispatch(setAppStatus({ status: "loading" }))
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
        dispatch(setAppStatus({ status: "succeeded" }))
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(updateTask({ todolistId, taskId, domainModel: model }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      }).catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
  }
}


