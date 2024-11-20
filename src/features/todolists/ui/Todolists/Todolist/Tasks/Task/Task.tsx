import React, { ChangeEvent } from "react"
import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import ListItem from "@mui/material/ListItem"
import {

  removeTaskTC, updateTaskTC
} from "../../../../../model/tasks-reducer"
import { useAppDispatch } from "../../../../../../../app/hooks/useAppDispatch"
import { DomainTask } from "../../../../../api/tasksApi.types"
import { TaskStatus } from "common/enums/enums"

type Props = {
  todoListId: string
  disabled?:boolean
  task: DomainTask
}

export const Task = ({ task, todoListId,disabled }: Props) => {
  const { title, status } = task

  const dispatch = useAppDispatch()

  const removeTasks = () => {
    dispatch(removeTaskTC({ taskId: task.id, todolistId: todoListId }))
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    dispatch(updateTaskTC({ taskId: task.id, todolistId: todoListId, domainModel: { status } }))
  }

  const updateTaskTitle = (title: string) => {
    dispatch(updateTaskTC({ taskId: task.id, todolistId: todoListId, domainModel: { title } }))
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
          disabled={disabled}
        />
        <EditableSpan value = {title} onChange = {updateTaskTitle} disabled={disabled}/>
      </div>
      <IconButton
        aria-label = "delete"
        onClick = {removeTasks}
        size = "small"
        color = "primary"
        disabled={disabled}
      >
        <DeleteIcon fontSize = "small" />
      </IconButton>
    </ListItem>
  )
}
