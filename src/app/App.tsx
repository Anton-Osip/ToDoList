import React, { useEffect, useState } from "react"
import "./App.css"
import s from "./App.module.css"
import Container from "@mui/material/Container"
import { ButtonAppBar } from "common/components/ButtonAppBar/ButtonAppBar"
import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material"
import { getTheme } from "common/theme/theme"
import { useAppSelector } from "./hooks/useAppSelector"
import { ErrorSnackbar } from "common/components/ErrorSnackbar/ErrorSnackbar"
import { Outlet } from "react-router-dom"
import { selectThemeMode, setIsLoggedIn } from "./app-reducer"
import { useMeQuery } from "../features/auth/api/authApi"
import { ResultCode } from "common/enums/enums"
import { useAppDispatch } from "./hooks/useAppDispatch"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const dispatch = useAppDispatch()
  const [isInitialized, setIsInitialized] = useState(false)

  const { data, isLoading } = useMeQuery()

  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true)
      if (data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      }
    }
  }, [isLoading, data,dispatch])


  return (
    <ThemeProvider theme = {getTheme(themeMode)}>
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
