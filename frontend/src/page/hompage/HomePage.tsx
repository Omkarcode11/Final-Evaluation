import { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import HomeNavigation from '../../components/navigation/HomeNavigation'
import classes from './HomePage.module.css'
import { context } from '../../components/context/MyContextApp'

function HomePage() {

  return (
    <div className={classes.container}>
      <HomeNavigation/>
      <Outlet/>
    </div>
  )
}

export default HomePage