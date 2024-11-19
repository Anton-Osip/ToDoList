import React, { ChangeEvent, useState } from "react"
import TextField from "@mui/material/TextField"

type Props = {
  value: string
  onChange: (newTitle: string) => void
}

export const EditableSpan = ({ value, onChange }: Props) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(value)

  const activateEditModeHandler = () => {
    setEditMode(true)
  }

  const deactivateEditModeHandler = () => {
    setEditMode(false)
    onChange(title)
  }

  const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  const inputStyles = { maxWidth: "160px", minWidth: "160px" }

  return (
    <>
      {editMode ? (
        <TextField
          variant="outlined"
          color="secondary"
          size="small"
          value={title}
          onChange={changeTitleHandler}
          onBlur={deactivateEditModeHandler}
          autoFocus
          style={inputStyles}
        />
      ) : (
        // <input
        //     value = {title}
        //     onChange = {changeTitleHandler}
        //     onBlur = {deactivateEditModeHandler}
        //     autoFocus
        // />
        <span onDoubleClick={activateEditModeHandler}>{value}</span>
      )}
    </>
  )
}
