import React, { useEffect } from "react"
import "./App.css"
import s from "./App.module.css"
import Container from "@mui/material/Container"
import { ButtonAppBar } from "common/components/ButtonAppBar/ButtonAppBar"
import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material"
import { getTheme } from "common/theme/theme"
import { useAppSelector } from "./hooks/useAppSelector"
import { ErrorSnackbar } from "common/components/ErrorSnackbar/ErrorSnackbar"
import { Outlet } from "react-router-dom"
import { useAppDispatch } from "./hooks/useAppDispatch"
import { initializeAppTC, selectIsInitialized } from "../features/auth/model/auth-reducer"
import { selectThemeMode } from "./app-reducer"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const isInitialized = useAppSelector(selectIsInitialized)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [dispatch])

  return (
    <ThemeProvider theme = {theme}>
      <CssBaseline />
      <Container fixed>
        <ButtonAppBar />
        {isInitialized && (
          <>
            <Outlet />
          </>
        )}
        {!isInitialized && (
          <div className = {s.circularProgressContainer}>
            <CircularProgress size = {150} thickness = {3} />
          </div>
        )}
        <ErrorSnackbar />
      </Container>
    </ThemeProvider>
  )
}
