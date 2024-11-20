import { SyntheticEvent } from "react"
import Alert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"
import { useAppSelector } from "../../../app/hooks/useAppSelector"
import { selectAppError } from "../../../app/appSelectors"
import { useAppDispatch } from "../../../app/hooks/useAppDispatch"
import { setAppErrorAC } from "../../../app/app-reducer"

export const ErrorSnackbar = () => {
  const error = useAppSelector(selectAppError)
  const dispatch = useAppDispatch()

  const handleClick = () => {
    dispatch(setAppErrorAC({ error: null }))
  };

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway" || reason === "timeout") {
      dispatch(setAppErrorAC({ error: null }))
    }
  }

  return (
    <Snackbar open = {error !== null} autoHideDuration = {3000} onClose = {handleClose}>
      <Alert onClose = {handleClick} severity = "error" variant = "filled" sx = {{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  )
}
