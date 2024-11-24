import Grid from "@mui/material/Grid2"
import { TodoList } from "./Todolist/TodoList"
import { useAppSelector } from "../../../../app/hooks/useAppSelector"
import { selectTasks } from "../../model/tasks-reducer"
import { useGetTodolistsQuery } from "../../api/todolistsApi"

export const TodoLists = () => {
  const tasks = useAppSelector(selectTasks)

  const { data: todolists } = useGetTodolistsQuery()

  return (
    <Grid container spacing = {2} sx = {{ mt: "40px" }}>

      {todolists?.map((tl) => {
        return (
          <Grid key = {tl.id} size = {{ xs: 12, sm: 6, md: 4, xl: 3 }}>
            <TodoList todoList = {tl} tasks = {tasks[tl.id]} />
          </Grid>
        )
      })}
    </Grid>
  )
}
