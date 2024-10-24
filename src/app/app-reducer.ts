import { Dispatch } from 'redux'
import { authAPI } from 'api/todolists-api'
import { setIsLoggedIn } from 'features/Login/auth-reducer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false,
  },
  reducers: {
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
    setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error
    },
  },
  selectors: {
    selectStatus: state => state.status,
    selectIsInitialized: state => state.isInitialized,
    selectError: state => state.error,
  },
})

export const appReducer = slice.reducer

export const { setAppStatus, setAppInitialized, setAppError } = slice.actions
export const { selectStatus, selectIsInitialized, selectError } = slice.selectors

export const appActions = slice.actions
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const initializeAppTC = () => (dispatch: Dispatch) => {
  authAPI.me().then(res => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
    } else {
    }

    dispatch(setAppInitialized({ isInitialized: true }))
  })
}

export type AppInitialStateType = ReturnType<typeof slice.getInitialState>
