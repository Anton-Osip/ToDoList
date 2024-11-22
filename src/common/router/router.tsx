import { createBrowserRouter } from "react-router-dom"
import { App } from "../../app/App"
import { Main } from "../../app/Main"
import { Login } from "../../features/auth/ui/Login/Login"
import { Page404 } from "common/components/Page404/Page404"

export const Path = {
  Login: "login"
} as const


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [{
      path: "/",
      element: <Main />
    }, {
      path: Path.Login,
      element: <Login />
    }, {
      path: "*",
      element: <Page404 />
    }]
  }
], {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true
  }
})
