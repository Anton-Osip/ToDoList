import { addTodolistTC } from "../features/todolists/model/todolists-reducer"
import Grid from "@mui/material/Grid2"
import { AddItemForm } from "common/components/AddItemForm/AddItemForm"
import { TodoLists } from "../features/todolists/ui/Todolists/TodoLists"
import { useAppDispatch } from "./hooks/useAppDispatch"

export const Main = () => {
  const dispatch = useAppDispatch()

  const addTodoList = (title: string) => {
    dispatch(addTodolistTC({ title }))
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
