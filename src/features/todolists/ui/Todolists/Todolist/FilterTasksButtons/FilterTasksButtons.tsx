import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import React from "react"
import {
  changeTodoListFilter,
  FilterValue,
} from "../../../../model/todolists-reducer"
import { useAppDispatch } from "../../../../../../app/hooks/useAppDispatch"

type Props = {
  todoListId: string
  filter: FilterValue
}

export const FilterTasksButtons = ({ todoListId, filter }: Props) => {
  const dispatch = useAppDispatch()

  const filterTasks = (filter: FilterValue) => {
    dispatch(changeTodoListFilter({ todoListId, filter }))
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Button
        color="primary"
        variant={filter === "All" ? "contained" : "outlined"}
        onClick={() => filterTasks("All")}
      >
        All
      </Button>
      <Button
        color="primary"
        variant={filter === "Active" ? "contained" : "outlined"}
        onClick={() => filterTasks("Active")}
      >
        Active
      </Button>
      <Button
        color="primary"
        variant={filter === "Completed" ? "contained" : "outlined"}
        onClick={() => filterTasks("Completed")}
      >
        Completed
      </Button>
    </Box>
  )
}