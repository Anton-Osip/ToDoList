import List from "@mui/material/List"
import React from "react"
import { Task } from "./Task/Task"
import { TasksSkeleton } from "../../../skeletons/TasksSkeleton/TasksSkeleton"
import { TasksPagination } from "../TasksPagination/TasksPagination"
import { FilterValue } from "../../../../lib/types/types"
import { useTasks } from "../../../../lib/hooks/useTasks"

type Props = {
  todoListId: string
  disabled?: boolean
  filter: FilterValue
}

export const Tasks = ({ todoListId, filter, disabled }: Props) => {
  const { tasks, isLoading, totalCount, page, setPage } = useTasks(filter, todoListId)

  if (isLoading) {
    return (
      <div style = {{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "32px" }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TasksSkeleton key = {id} />
          ))}
      </div>
    )
  }

  return (
    <>
      <List>
        {tasks?.length ? (
          tasks.map((task) => {
            return <Task key = {task.id} task = {task} todoListId = {todoListId} disabled = {disabled} />
          })
        ) : (
          <div>Нет данных</div>
        )}
      </List>
      <TasksPagination totalCount = {totalCount || 0 || 0} page = {page} setPage = {setPage} />
    </>
  )
}
