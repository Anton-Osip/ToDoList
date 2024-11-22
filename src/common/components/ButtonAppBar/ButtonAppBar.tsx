import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { MenuButton } from "../MenuButton/MenuButton"
import { LinearProgress, Switch } from "@mui/material"
import { changeThemeAC } from "../../../app/app-reducer"
import { useAppDispatch } from "../../../app/hooks/useAppDispatch"
import { useAppSelector } from "../../../app/hooks/useAppSelector"
import React from "react"
import { selectAppStatus, selectThemeMode } from "../../../app/appSelectors"
import { selectIsLoggedIn } from "../../../features/auth/model/authSelectors"
import { logoutTC } from "../../../features/auth/model/auth-reducer"

export const ButtonAppBar = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectAppStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()

  const changeModeHandler = () => {
    dispatch(
      changeThemeAC({ themeMode: themeMode === "light" ? "dark" : "light" })
    )
  }

  const logout=()=>{
    dispatch(logoutTC())
  }

  return (
    <Box sx = {{ flexGrow: 1, paddingBottom: "80px" }}>
      <AppBar position = "fixed" color = "primary">
        <Toolbar>
          <Typography variant = "h5" component = "div" sx = {{ flexGrow: 1 }}>
            Tasks Manager
          </Typography>
          {isLoggedIn && <MenuButton onClick={logout}>Logout</MenuButton>}
          <Switch color = {"primary"} onChange = {changeModeHandler} />
        </Toolbar>
        {status === "loading" && <LinearProgress />}
      </AppBar>
    </Box>

  )
}
