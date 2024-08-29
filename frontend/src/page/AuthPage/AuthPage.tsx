import { Outlet } from "react-router-dom"
import AuthNavigation from "../../components/auth/AuthNavigation"
import classes from './authPage.module.css'

type Props = {
  
}

function AuthPage({}: Props) {
  return (
    <div className={classes.authPage}>
    <div className={classes.container }>
      <AuthNavigation/>
      <Outlet/>
    </div>
    </div>
  )
}

export default AuthPage