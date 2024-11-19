export type ThemeMode = "dark" | "light"

type InitialState = typeof initialState

const initialState = {
  themeMode: "light" as ThemeMode,
}

export const appReducer = (
  state: InitialState = initialState,
  action: Actions,
): InitialState => {
  switch (action.type) {
    case "CHANGE-THEME": {
      return { ...state, themeMode: action.payload.themeMode }
    }
    default:
      return state
  }
}

export const changeThemeAC = (payload: { themeMode: ThemeMode }) => {
  return { type: "CHANGE-THEME", payload }
}

type ChangeThemeAC = ReturnType<typeof changeThemeAC>

type Actions = ChangeThemeAC
