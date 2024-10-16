import { TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType } from 'api/todolists-api'
import { AppRootStateType, AppThunk } from 'app/store'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { setAppStatus } from 'app/app-reducer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addTodolist, removeTodolist, setTodolists } from 'features/TodolistsList/todolists-reducer'
import { setIsLoggedIn } from 'features/Login/auth-reducer'

const slice = createSlice({
  name: 'tasks',
  initialState: {} as TasksStateType,
  reducers: {
    removeTask: (state, action: PayloadAction<{ taskId: string; todolistId: string }>) => {
      let tasks = state[action.payload.todolistId]
      let index = tasks.findIndex(task => task.id === action.payload.taskId)
      if (index !== -1) {
        tasks.splice(index, 1)
      }
    },
    addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      let tasks = state[action.payload.task.todoListId]
      tasks.unshift(action.payload.task)
    },
    updateTask: (
      state,
      action: PayloadAction<{ taskId: string; model: UpdateDomainTaskModelType; todolistId: string }>,
    ) => {
      let tasks = state[action.payload.todolistId]
      let index = tasks.findIndex(task => task.id === action.payload.taskId)
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model }
      }
    },
    setTasks: (state, action: PayloadAction<{ tasks: Array<TaskType>; todolistId: string }>) => {
      state[action.payload.todolistId] = action.payload.tasks
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.id]
      })
      .addCase(setTodolists, (state, action) => {
        action.payload.todolists.forEach(tl => {
          state[tl.id] = []
        })
      })
      .addCase(setIsLoggedIn, () => {
        return {}
      })
  },
})

export const tasksReducer = slice.reducer

export const { removeTask, addTask, setTasks, updateTask } = slice.actions

// thunks
export const fetchTasksTC =
  (todolistId: string): AppThunk =>
  dispatch => {
    dispatch(setAppStatus({ status: 'loading' }))
    todolistsAPI.getTasks(todolistId).then(res => {
      const tasks = res.data.items
      dispatch(setTasks({ tasks: tasks, todolistId }))
      dispatch(setAppStatus({ status: 'succeeded' }))
    })
  }
export const removeTaskTC =
  (taskId: string, todolistId: string): AppThunk =>
  dispatch => {
    todolistsAPI.deleteTask(todolistId, taskId).then(() => {
      const action = removeTask({ taskId: taskId, todolistId: todolistId })
      dispatch(action)
    })
  }
export const addTaskTC =
  (title: string, todolistId: string): AppThunk =>
  dispatch => {
    dispatch(setAppStatus({ status: 'loading' }))
    todolistsAPI
      .createTask(todolistId, title)
      .then(res => {
        if (res.data.resultCode === 0) {
          const task = res.data.data.item
          const action = addTask({ task: task })
          dispatch(action)
          dispatch(setAppStatus({ status: 'succeeded' }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch)
      })
  }
export const updateTaskTC =
  (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): AppThunk =>
  (dispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const task = state.tasks[todolistId].find(t => t.id === taskId)
    if (!task) {
      //throw new Error("task not found in the state");
      console.warn('task not found in the state')
      return
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...domainModel,
    }

    todolistsAPI
      .updateTask(todolistId, taskId, apiModel)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(updateTask({ taskId: taskId, model: domainModel, todolistId }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch)
      })
  }

// types
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}
