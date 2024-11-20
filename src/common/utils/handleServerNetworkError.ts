import { Dispatch } from "redux"
import { setAppErrorAC, setAppStatusAC } from "../../app/app-reducer"

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
  dispatch(setAppErrorAC({ error: error.message }))
  dispatch(setAppStatusAC({ status: "failed" }))
}
