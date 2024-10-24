import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppRootStateType } from 'app/store'
import {
  addTodolistTC,
  changeTodolistFilter,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  FilterValuesType,
  removeTodolistTC,
  TodolistDomainType,
} from './todolists-reducer'
import { TasksStateType, tasksThunks } from './tasks-reducer'
import { TaskStatuses } from 'api/todolists-api'
import { Grid, Paper } from '@mui/material'
import { AddItemForm } from 'components/AddItemForm/AddItemForm'
import { Todolist } from './Todolist/Todolist'
import { Navigate } from 'react-router-dom'
import { useAppDispatch } from 'hooks/useAppDispatch'

type PropsType = {
  demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return
    }
    const thunk = fetchTodolistsTC()
    dispatch(thunk)
  }, [dispatch, demo, isLoggedIn])

  const removeTask = useCallback(
    function (taskId: string, todolistId: string) {
      const thunk = tasksThunks.removeTask({ todolistId, taskId })
      dispatch(thunk)
    },
    [dispatch],
  )

  const addTask = useCallback(
    function (title: string, todolistId: string) {
      const thunk = tasksThunks.addTask({ title, todolistId })
      dispatch(thunk)
    },
    [dispatch],
  )

  const changeStatus = useCallback(
    function (taskId: string, status: TaskStatuses, todolistId: string) {
      const thunk = tasksThunks.updateTask({ todolistId, taskId, domainModel: { status } })
      dispatch(thunk)
    },
    [dispatch],
  )

  const changeTaskTitle = useCallback(
    function (taskId: string, title: string, todolistId: string) {
      const thunk = tasksThunks.updateTask({ todolistId, taskId, domainModel: { title } })
      dispatch(thunk)
    },
    [dispatch],
  )

  const changeFilter = useCallback(
    function (value: FilterValuesType, todolistId: string) {
      const action = changeTodolistFilter({ id: todolistId, filter: value })
      dispatch(action)
    },
    [dispatch],
  )

  const removeTodolist = useCallback(
    function (id: string) {
      const thunk = removeTodolistTC(id)
      dispatch(thunk)
    },
    [dispatch],
  )

  const changeTodolistTitle = useCallback(
    function (id: string, title: string) {
      const thunk = changeTodolistTitleTC(id, title)
      dispatch(thunk)
    },
    [dispatch],
  )

  const addTodolist = useCallback(
    (title: string) => {
      const thunk = addTodolistTC(title)
      dispatch(thunk)
    },
    [dispatch],
  )

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />
  }

  return (
    <>
      <Grid container style={{ padding: '20px' }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map(tl => {
          let allTodolistTasks = tasks[tl.id]

          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: '10px' }}>
                <Todolist
                  todolist={tl}
                  tasks={allTodolistTasks}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                  demo={demo}
                />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
