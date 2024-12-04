import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import React from "react"
import { useAppDispatch } from "../../../../../../app/hooks/useAppDispatch"
import { todolistsApi } from "../../../../api/todolistsApi"
import { FilterValue } from "../../../../lib/types/types"

type Props = {
  todoListId: string
  disabled?: boolean
  filter: FilterValue
}

export const FilterTasksButtons = ({ todoListId, filter, disabled }: Props) => {
  const dispatch = useAppDispatch()

  const filterTasks = (filter: FilterValue) => {
    dispatch(
      todolistsApi.util.updateQueryData(
        "getTodolists",
        undefined,
        state => {
          const index = state.findIndex(tl => tl.id === todoListId)
          if (index !== -1) {
            state[index].filter = filter
          }
        }
      )
    )
  }

  return (
    <Box sx = {{ display: "flex", justifyContent: "space-between" }}>
      <Button
        color = "primary"
        variant = {filter === "All" ? "contained" : "outlined"}
        onClick = {() => filterTasks("All")}
        disabled = {disabled}
      >
        All
      </Button>
      <Button
        color = "primary"
        variant = {filter === "Active" ? "contained" : "outlined"}
        onClick = {() => filterTasks("Active")}
        disabled = {disabled}
      >
        Active
      </Button>
      <Button
        color = "primary"
        variant = {filter === "Completed" ? "contained" : "outlined"}
        onClick = {() => filterTasks("Completed")}
        disabled = {disabled}
      >
        Completed
      </Button>
    </Box>
  )
}
