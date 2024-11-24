import List from "@mui/material/List"
import React from "react"
import { Task } from "./Task/Task"
import { FilterValue } from "../../../../model/todolists-reducer"
import { DomainTask } from "../../../../api/tasksApi.types"
import { TaskStatus } from "common/enums/enums"
import { useGetTasksQuery } from "../../../../api/tasksApi"

type Props = {
  todoListId: string
  disabled?: boolean
  tasks: DomainTask[]
  filter: FilterValue
}

export const Tasks = ({ todoListId, filter, disabled }: Props) => {

  const { data: tasks } = useGetTasksQuery(todoListId)


  let tasksForTodolist = tasks?.items

  if (filter === "Active") {
    tasksForTodolist = tasksForTodolist?.filter(task => task.status === TaskStatus.New)
  }

  if (filter === "Completed") {
    tasksForTodolist = tasksForTodolist?.filter(task => task.status === TaskStatus.Completed)
  }

  return (
    <List>
      {tasksForTodolist?.length ? (
        tasksForTodolist.map((task) => {
          return <Task key = {task.id} task = {task} todoListId = {todoListId} disabled = {disabled} />
        })
      ) : (
        <div>Нет данных</div>
      )}
    </List>
  )
}
