import React, { ChangeEvent, useState } from "react"
import TextField from "@mui/material/TextField"

type Props = {
  value: string
  disabled?: boolean
  onChange: (newTitle: string) => void
}

export const EditableSpan = ({ value, onChange, disabled }: Props) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(value)

  const activateEditModeHandler = () => {
    if (!disabled) setEditMode(true)
  }

  const deactivateEditModeHandler = () => {
    if (!disabled) {
      setEditMode(false)
      onChange(title)
    }
  }

  const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  const inputStyles = { maxWidth: "160px", minWidth: "160px" }

  return (
    <>
      {editMode ? (
        <TextField
          variant = "outlined"
          color = "secondary"
          size = "small"
          value = {title}
          onChange = {changeTitleHandler}
          onBlur = {deactivateEditModeHandler}
          autoFocus
          style = {inputStyles}
          disabled = {disabled}
        />
      ) : (
        // <input
        //     value = {title}
        //     onChange = {changeTitleHandler}
        //     onBlur = {deactivateEditModeHandler}
        //     autoFocus
        // />
        <span onDoubleClick = {activateEditModeHandler}>{value}</span>
      )}
    </>
  )
}
