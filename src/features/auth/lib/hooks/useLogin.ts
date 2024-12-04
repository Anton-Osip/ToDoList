import { useAppSelector } from "../../../../app/hooks/useAppSelector"
import { selectIsLoggedIn, selectThemeMode, setIsLoggedIn } from "../../../../app/app-reducer"
import { getTheme } from "common/theme/theme"
import { useAppDispatch } from "../../../../app/hooks/useAppDispatch"
import { useLoginMutation } from "../../api/authApi"
import { SubmitHandler, useForm } from "react-hook-form"
import { LoginArgs } from "../../api/authApi.types"
import { ResultCode } from "common/enums/enums"

export const useLogin = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const theme = getTheme(themeMode)

  const dispatch = useAppDispatch()

  const [login] = useLoginMutation()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LoginArgs>({ defaultValues: { email: '', password: '', rememberMe: false } })

  const onSubmit: SubmitHandler<LoginArgs> = data => {
    login(data)
      .then(res => {
        if (res.data?.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedIn({ isLoggedIn: true }))
          localStorage.setItem('sn-token', res.data.data.token)
        }
      })
      .finally(() => {
        reset()
      })
  }

  return { isLoggedIn, theme, handleSubmit, onSubmit, control, errors, register }
}
