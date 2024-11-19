import { EditableSpan } from "../../../../../../common/components/EditableSpan/EditableSpan"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import React from "react"

type Props = {
  title: string
  updateTodoListTitle: (title: string) => void
  removeTodoList: () => void
}

export const TodolistTitle = ({
  title,
  updateTodoListTitle,
  removeTodoList,
}: Props) => {
  const updateTodoListTitleHandler = (title: string) => {
    updateTodoListTitle(title)
  }

  return (
    <h3>
      <EditableSpan value={title} onChange={updateTodoListTitleHandler} />
      <IconButton aria-label="delete" onClick={removeTodoList} color="primary">
        <DeleteIcon />
      </IconButton>
    </h3>
  )
}
