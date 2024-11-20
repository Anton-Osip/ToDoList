import { Dispatch } from "redux"
import { setAppErrorAC, setAppStatusAC } from "../../app/app-reducer"
import { BaseResponse } from "common/types/types"

export const handleServerAppError = <T, >(data: BaseResponse<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC({ error: data.messages[0] }))
  } else {
    dispatch(setAppErrorAC({ error: "Some error occurred" }))
  }
  dispatch(setAppStatusAC({ status: "failed" }))
}
