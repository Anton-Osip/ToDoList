export type ThemeMode = "dark" | "light"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

type InitialState = typeof initialState

const initialState = {
  themeMode: "light" as ThemeMode,
  status: "idle" as RequestStatus,
  error: null as null | string
}

export const appReducer = (
  state: InitialState = initialState,
  action: Actions
): InitialState => {
  switch (action.type) {
    case "CHANGE-THEME": {
      return { ...state, themeMode: action.payload.themeMode }
    }
    case "SET-STATUS": {
      return { ...state, status: action.payload.status }
    }
    case "SET-APP-ERROR": {
      return { ...state, error: action.payload.error }
    }
    default:
      return state
  }
}

export const changeThemeAC = (payload: { themeMode: ThemeMode }) => {
  return { type: "CHANGE-THEME", payload } as const
}

export const setAppStatusAC = (payload: { status: RequestStatus }) => {
  return { type: "SET-STATUS", payload } as const
}

export const setAppErrorAC = (payload: { error: null | string }) => {
  return { type: "SET-APP-ERROR", payload } as const
}

type ChangeThemeAC = ReturnType<typeof changeThemeAC>
type SetAppStatusAC = ReturnType<typeof setAppStatusAC>
type SetAppErrorAC = ReturnType<typeof setAppErrorAC>

type Actions = ChangeThemeAC | SetAppStatusAC | SetAppErrorAC
