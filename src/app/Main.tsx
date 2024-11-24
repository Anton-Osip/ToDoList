import Grid from "@mui/material/Grid2"
import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import { TodoLists } from "../features/todolists/ui/Todolists/TodoLists"
import { useAddTodolistMutation } from "../features/todolists/api/todolistsApi"
import { useAppSelector } from "./hooks/useAppSelector"
import { Navigate } from "react-router-dom"
import { Path } from "common/router/router"
import { selectIsLoggedIn } from "./app-reducer"

export const Main = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const [addTodolist] = useAddTodolistMutation()

  const addTodoList = (title: string) => {
    addTodolist(title)
  }
  if (!isLoggedIn) {
    return <Navigate to = {Path.Login} />
  }
  return (
    <>
      <Grid container>
        <Grid sx = {{ m: "0 auto" }}>
          <AddItemForm addItem = {addTodoList} />
        </Grid>
      </Grid>
      <TodoLists />
    </>
  )
}
