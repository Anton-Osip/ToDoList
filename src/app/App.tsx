import React from "react"
import "./App.css"
import Container from "@mui/material/Container"
import { ButtonAppBar } from "../common/components/ButtonAppBar/ButtonAppBar"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { getTheme } from "../common/theme/theme"
import { Main } from "./Main"
import { useAppSelector } from "./hooks/useAppSelector"
import { selectThemeMode } from "./appSelectors"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container fixed>
        <ButtonAppBar />
        <Main />
      </Container>
    </ThemeProvider>
  )
}
