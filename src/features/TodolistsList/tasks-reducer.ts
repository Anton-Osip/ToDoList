import { TaskPriorities, TaskStatuses, TaskType, todolistsAPI } from 'api/todolists-api'
import { AppThunk } from 'app/store'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { setAppError, setAppStatus } from 'app/app-reducer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addTodolist, removeTodolist, setTodolists } from 'features/TodolistsList/todolists-reducer'
import { setIsLoggedIn } from 'features/Login/auth-reducer'
import { createAppAsyncThunk } from 'utils/create-app-async-thunk'

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
  },
  extraReducers: builder => {
    builder
      .addCase(updateTask.fulfilled, (state, action) => {
        let tasks = state[action.payload.todolistId]
        let index = tasks.findIndex(task => task.id === action.payload.taskId)
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.domainModel }
        }
      })
      .addCase(addTask.fulfilled, (state, action) => {
        let tasks = state[action.payload.task.todoListId]
        tasks.unshift(action.payload.task)
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks
      })
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

// thunks
const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[]; todolistId: string }, string>(
  'tasks/fetchTasks',
  async (todolistId: string, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(setAppStatus({ status: 'loading' }))

      const res = await todolistsAPI.getTasks(todolistId)
      const tasks = res.data.items
      dispatch(setAppStatus({ status: 'succeeded' }))
      return { tasks, todolistId }
    } catch (error: any) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

const addTask = createAppAsyncThunk<
  {
    task: TaskType
  },
  { todolistId: string; title: string }
>('tasks/addTask', async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    dispatch(setAppStatus({ status: 'loading' }))
    const res = await todolistsAPI.createTask(arg)
    if (res.data.resultCode === 0) {
      const task = res.data.data.item
      dispatch(setAppStatus({ status: 'succeeded' }))
      return { task }
    } else {
      handleServerAppError(res.data, dispatch)
      return rejectWithValue(null)
    }
  } catch (error: unknown) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null)
  }
})

const updateTask = createAppAsyncThunk<UpdateTaskArgType, UpdateTaskArgType>(
  'tasks/updateTask',
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI
    try {
      dispatch(setAppStatus({ status: 'loading' }))
      const state = getState()
      const task = state.tasks[arg.todolistId].find(t => t.id === arg.taskId)
      if (!task) {
        dispatch(setAppError({ error: 'Task not found' }))
        return rejectWithValue(null)
      }

      const apiModel: UpdateDomainTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...arg.domainModel,
      }

      const res = await todolistsAPI.updateTask({
        taskId: arg.taskId,
        todolistId: arg.todolistId,
        domainModel: apiModel,
      })
      if (res.data.resultCode === 0) {
        dispatch(setAppStatus({ status: 'succeeded' }))
        return arg
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch)
      return rejectWithValue(null)
    }
  },
)
export const removeTaskTC =
  (taskId: string, todolistId: string): AppThunk =>
  dispatch => {
    todolistsAPI.deleteTask(todolistId, taskId).then(() => {
      const action = tasksActions.removeTask({ taskId: taskId, todolistId: todolistId })
      dispatch(action)
    })
  }
export const tasksReducer = slice.reducer

export const tasksActions = slice.actions
export const tasksThunks = { fetchTasks, addTask, updateTask }

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

type UpdateTaskArgType = {
  todolistId: string
  taskId: string
  domainModel: UpdateDomainTaskModelType
}
