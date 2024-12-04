import FormControl from "@mui/material/FormControl"
import Grid from "@mui/material/Grid2"
import { Navigate } from "react-router-dom"
import { useLogin } from "../../lib/hooks/useLogin"
import { FormLabel } from "@mui/material"
import { LoginFormLabel } from "./LoginFormLabel/LoginFormLabel"
import { LoginForm } from "./LoginForm/LoginForm"

export const Login = () => {
  const { isLoggedIn } = useLogin()

  if (isLoggedIn) {
    return <Navigate to = {"/"} />
  }
  return (
    <Grid container justifyContent = {"center"} height = {`calc(100lvh - 80px)`}>
      <Grid justifyContent = {"center"} alignContent = {"center"}>
        <FormControl>
          <FormLabel>
            <LoginFormLabel />
            <LoginForm />
          </FormLabel>
        </FormControl>
      </Grid>
    </Grid>
  )
}
