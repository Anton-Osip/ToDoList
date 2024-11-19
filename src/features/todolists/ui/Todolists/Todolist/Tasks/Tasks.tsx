import List from "@mui/material/List"
import React from "react"
import { Task } from "./Task/Task"
import { TaskProps } from "../TodoList"
import { FilterValue } from "../../../../model/todolists-reducer"

type Props = {
  todoListId: string
  tasks: TaskProps[]
  filter: FilterValue
}

export const Tasks = ({ todoListId, tasks, filter }: Props) => {
  let filteredTasks = tasks
  if (filter === "Active")
    filteredTasks = tasks.filter((task: TaskProps) => !task.isDone)
  if (filter === "Completed")
    filteredTasks = tasks.filter((task: TaskProps) => task.isDone)

  return (
    <List>
      {filteredTasks?.length ? (
        filteredTasks.map((task) => {
          return <Task key={task.id} task={task} todoListId={todoListId} />
        })
      ) : (
        <div>Нет данных</div>
      )}
    </List>
  )
}
