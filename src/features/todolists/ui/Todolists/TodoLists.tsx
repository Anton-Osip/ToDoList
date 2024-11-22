import Grid from "@mui/material/Grid2"
import { TodoList } from "./Todolist/TodoList"
import { useAppSelector } from "../../../../app/hooks/useAppSelector"
import { useEffect } from "react"
import { useAppDispatch } from "../../../../app/hooks/useAppDispatch"
import { fetchTodolistsThunk, selectTodoLists } from "../../model/todolists-reducer"
import { Navigate } from "react-router-dom"
import { Path } from "common/router/router"
import { selectIsLoggedIn } from "../../../auth/model/auth-reducer"
import { selectTasks } from "../../model/tasks-reducer"

export const TodoLists = () => {
  const todolists = useAppSelector(selectTodoLists)
  const tasks = useAppSelector(selectTasks)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsThunk())
  }, [dispatch])


  if (!isLoggedIn) {
    return <Navigate to = {Path.Login} />
  }

  return (
    <Grid container spacing = {2} sx = {{ mt: "40px" }}>
      {todolists.map((tl) => {
        return (
          <Grid key = {tl.id} size = {{ xs: 12, sm: 6, md: 4, xl: 3 }}>
            <TodoList todoList = {tl} tasks = {tasks[tl.id]} />
          </Grid>
        )
      })}
    </Grid>
  )
}
