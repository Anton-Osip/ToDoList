import { EditableSpan } from "common/components/EditableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import React from "react"
import { RequestStatus } from "../../../../../../app/app-reducer"

type Props = {
  title: string
  entityStatus: RequestStatus
  updateTodoListTitle: (title: string) => void
  removeTodoList: () => void
}

export const TodolistTitle = ({
                                title,
                                updateTodoListTitle,
                                removeTodoList, entityStatus
                              }: Props) => {
  const updateTodoListTitleHandler = (title: string) => {
    updateTodoListTitle(title)
  }

  return (
    <h3>
      <EditableSpan value = {title} onChange = {updateTodoListTitleHandler} disabled = {entityStatus === "loading"} />
      <IconButton aria-label = "delete" onClick = {removeTodoList} color = "primary"
                  disabled = {entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </h3>
  )
}
