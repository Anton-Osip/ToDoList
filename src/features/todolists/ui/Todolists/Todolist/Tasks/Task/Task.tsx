import React, { ChangeEvent } from "react"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import ListItem from "@mui/material/ListItem"
import { DomainTask, UpdateTaskModel } from "../../../../../api/tasksApi.types"
import { TaskStatus } from "common/enums/enums"
import { useRemoveTaskMutation, useUpdateTaskMutation } from "../../../../../api/tasksApi"

type Props = {
  todoListId: string
  disabled?: boolean
  task: DomainTask
}

export const Task = ({ task, todoListId, disabled }: Props) => {
  const { title, status } = task

  const [removeTask] = useRemoveTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const removeTasks = () => {
    removeTask({ taskId: task.id, todolistId: todoListId })
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const model: UpdateTaskModel = {
      title: task.title,
      status,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate
    }
    updateTask({ taskId: task.id, todolistId: todoListId, model })
  }

  const updateTaskTitle = (title: string) => {
    const model: UpdateTaskModel = {
      status: task.status,
      title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate
    }

    updateTask({ taskId: task.id, todolistId: todoListId, model })
  }

  return (
    <ListItem
      sx = {{
        p: 0,
        justifyContent: "space-between",
        opacity: status === 2 ? "0.5" : "1"
      }}
    >
      <div>
        <Checkbox
          color = "primary"
          checked = {status === 2}
          onChange = {changeTaskStatus}
          disabled = {disabled}
        />
        <EditableSpan value = {title} onChange = {updateTaskTitle} disabled = {disabled} />
      </div>
      <IconButton
        aria-label = "delete"
        onClick = {removeTasks}
        size = "small"
        color = "primary"
        disabled = {disabled}
      >
        <DeleteIcon fontSize = "small" />
      </IconButton>
    </ListItem>
  )
}
