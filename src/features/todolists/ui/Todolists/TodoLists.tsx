import Grid from "@mui/material/Grid2"
import { TodoList } from "./Todolist/TodoList"
import { useGetTodolistsQuery } from "../../api/todolistsApi"
import { TodolistSkeleton } from "../skeletons/TodolistSkeleton/TodolistSkeleton"

export const TodoLists = () => {

  const { data: todolists, isLoading } = useGetTodolistsQuery(undefined, {
    pollingInterval: 5000,
    skipPollingIfUnfocused: true
  })

  if (isLoading) {
    return (
      <div style = {{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "32px" }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key = {id} />
          ))}
      </div>
    )
  }

  return (
    <Grid container spacing = {2} sx = {{ mt: "40px" }}>

      {todolists?.map((tl) => {
        return (
          <Grid key = {tl.id} size = {{ xs: 12, sm: 6, md: 4, xl: 3 }}>
            <TodoList todoList = {tl} />
          </Grid>
        )
      })}
    </Grid>
  )
}
