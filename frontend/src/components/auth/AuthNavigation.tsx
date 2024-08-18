import { NavLink } from "react-router-dom";
import classes from './auth.module.css'

const AuthNavigation = () => {
  return (
    <header className={classes.container}>
      <h1 className={classes.header}>Quizzie</h1>
      <div className={classes.btnContainer}>
        <NavLink className={({isActive})=>isActive?`${classes.btn} ${classes.active}`:`${classes.btn}`} end to={"signup"}>Sign up</NavLink>
        <NavLink className={({isActive})=>isActive?`${classes.btn} ${classes.active}`:`${classes.btn}`} to={"login"}>Login</NavLink>
      </div>
    </header>
  );
};


export default AuthNavigation