import { authAPI, LoginParamsType } from 'api/todolists-api'
import { handleServerNetworkError } from 'utils/handle-server-network-error '
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { setAppStatus } from 'app/app-reducer'
import { handleServerAppError } from 'utils/handle-server-app-error'

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
  selectors: {
    selectIsLoggedIn: state => state.isLoggedIn,
  },
})

export const authReducer = slice.reducer
// Action creator также достаем с помощью slice
export const { setIsLoggedIn } = slice.actions
export const { selectIsLoggedIn } = slice.selectors

// thunks
export const loginTC =
  (data: LoginParamsType): AppThunk =>
  dispatch => {
    dispatch(setAppStatus({ status: 'loading' }))
    authAPI
      .login(data)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoggedIn({ isLoggedIn: true }))
          dispatch(setAppStatus({ status: 'succeeded' }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch)
      })
  }

export const logoutTC = (): AppThunk => dispatch => {
  dispatch(setAppStatus({ status: 'loading' }))
  authAPI
    .logout()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
        dispatch(setAppStatus({ status: 'succeeded' }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch)
    })
}
