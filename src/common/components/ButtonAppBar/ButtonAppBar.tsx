import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { MenuButton } from "../MenuButton/MenuButton"
import { LinearProgress, Switch } from "@mui/material"
import { useAppDispatch } from "../../../app/hooks/useAppDispatch"
import { useAppSelector } from "../../../app/hooks/useAppSelector"
import React from "react"
import {
  changeTheme,
  selectAppStatus,
  selectIsLoggedIn,
  selectThemeMode, setAppStatus,
  setIsLoggedIn
} from "../../../app/app-reducer"
import { useLogoutMutation } from "../../../features/auth/api/authApi"
import { clearTodolists } from "../../../features/todolists/model/todolists-reducer"
import { ResultCode } from "common/enums/enums"
import { clearTasks } from "../../../features/todolists/model/tasks-reducer"

export const ButtonAppBar = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectAppStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()
  const [logout] = useLogoutMutation()
  const changeModeHandler = () => {
    dispatch(
      changeTheme({ themeMode: themeMode === "light" ? "dark" : "light" })
    )
  }

  const logoutHandler = () => {
    logout()
      .then((res) => {
        if (res.data?.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedIn({ isLoggedIn: false }))
          dispatch(clearTodolists())
          dispatch(clearTasks())
          localStorage.removeItem("sn-token")
        }
      })
  }

  return (
    <Box sx = {{ flexGrow: 1, paddingBottom: "80px" }}>
      <AppBar position = "fixed" color = "primary">
        <Toolbar>
          <Typography variant = "h5" component = "div" sx = {{ flexGrow: 1 }}>
            Tasks Manager
          </Typography>
          {isLoggedIn && <MenuButton onClick = {logoutHandler}>Logout</MenuButton>}
          <Switch color = {"primary"} onChange = {changeModeHandler} />
        </Toolbar>
        {status === "loading" && <LinearProgress />}
      </AppBar>
    </Box>

  )
}
