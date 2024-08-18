import { NavLink } from 'react-router-dom'
import classes from './HomeNavigation.module.css'

type Props = {}

function HomeNavigation({}: Props) {
  return (
    <div className={classes.container}>
    <h1 >QUIZZIE</h1>
    <div className={classes.linkGroup}>
    <NavLink className={({isActive})=>isActive?`${classes.link} ${classes.active}`:classes.link} end to={'dashboard'}>Dashboard</NavLink> 
    <NavLink className={({isActive})=>isActive?`${classes.link} ${classes.active}`:classes.link} end to={'analytics'}>Analytics</NavLink> 
    <NavLink className={({isActive})=>isActive?`${classes.link} ${classes.active}`:classes.link} end to={'createquiz'}>Create Quiz</NavLink> 
    </div>
    <div>
    <hr/>
    <h2>Logout</h2>
    </div>
    </div>
  )
}

export default HomeNavigation