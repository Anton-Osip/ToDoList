import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid2"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import s from "./Login.module.css"
import { useAppDispatch } from "../../../../app/hooks/useAppDispatch"
import { loginTC, selectIsLoggedIn } from "../../model/auth-reducer"
import { useAppSelector } from "../../../../app/hooks/useAppSelector"
import { Navigate } from "react-router-dom"

type Inputs = {
  email: string
  password: string
  rememberMe: boolean
}

export const Login = () => {

  const {
    register,
    handleSubmit,
    reset, control,
    formState: { errors }
  }
    = useForm<Inputs>({ defaultValues: { email: "", password: "", rememberMe: false } })

  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const onSubmit: SubmitHandler<Inputs> = data => {
    dispatch(loginTC(data))
    reset()
  }

  if (isLoggedIn) {
    return <Navigate to = {"/"} />
  }
  return (
    <Grid container justifyContent = {"center"} height = {`calc(100lvh - 80px)`}>
      <Grid justifyContent = {"center"} alignContent = {"center"}>
        <FormControl>
          <form onSubmit = {handleSubmit(onSubmit)}>
            <FormGroup>

              <TextField label = "Email" margin = "normal"  {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Incorrect email address"
                }
              })} />

              {errors.email && <span className = {s.errorMessage}>{errors.email.message}</span>}

              <TextField type = "password" label = "Password" margin = "normal" {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]{4,}$/,
                  message: "Password must be at least 3 characters long"
                }
              })} />
              {errors.password && <span className = {s.errorMessage}>{errors.password.message}</span>}
              <FormControlLabel
                label = {"Remember me"}
                control = {
                  <Controller
                    name = {"rememberMe"}
                    control = {control}
                    render = {({ field: { value, ...field } }) => <Checkbox {...field} checked = {value} />}
                  />
                }
              />
              <Button type = {"submit"} variant = {"contained"} color = {"primary"}>
                Login
              </Button>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  )
}
