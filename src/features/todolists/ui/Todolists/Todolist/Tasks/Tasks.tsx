import List from "@mui/material/List"
import React, { useEffect } from "react"
import { Task } from "./Task/Task"
import { FilterValue } from "../../../../model/todolists-reducer"
import { DomainTask } from "../../../../api/tasksApi.types"
import { TaskStatus } from "common/enums/enums"
import { useAppDispatch } from "../../../../../../app/hooks/useAppDispatch"
import { fetchTasksTC } from "../../../../model/tasks-reducer"

type Props = {
  todoListId: string
  disabled?:boolean
  tasks: DomainTask[]
  filter: FilterValue
}

export const Tasks = ({ todoListId, tasks, filter,disabled }: Props) => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(todoListId))
  }, [dispatch,todoListId])


  let filteredTasks = tasks
  if (filter === "Active")
    filteredTasks = tasks.filter((task: DomainTask) => task.status === TaskStatus.New)
  if (filter === "Completed")
    filteredTasks = tasks.filter((task: DomainTask) => task.status === TaskStatus.Completed)

  return (
    <List>
      {filteredTasks?.length ? (
        filteredTasks.map((task) => {
          return <Task key = {task.id} task = {task} todoListId = {todoListId} disabled={disabled}/>
        })
      ) : (
        <div>Нет данных</div>
      )}
    </List>
  )
}
