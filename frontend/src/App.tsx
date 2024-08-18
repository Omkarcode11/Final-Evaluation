import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthPage from './page/AuthPage/AuthPage'
import Signup from './components/auth/signup/SignupForm'
import Login from './components/auth/login/LoginForm'
import HomePage from './page/hompage/HomePage'

function App() {
  let route = createBrowserRouter([
    {path:"/",element:<HomePage/>},
    {path:'/auth',element:<AuthPage/>,children:[
      {path:'login',element:<Login/>,index:true},
      {path:'signup',element:<Signup/>},
    ]}
  ])

  return (
   <RouterProvider router={route}/>
  )
}

export default App
