import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthPage from './page/AuthPage/AuthPage'
import Signup from './components/auth/signup/SignupForm'
import Login from './components/auth/login/LoginForm'
import HomePage from './page/hompage/HomePage'
import Dashboard from './components/dashboard/Dashboard'
import Analytics from './components/analytics/Analytics'
import CreateQuiz from './components/createQuize/CreateQuiz'
import QuizAnalytics from './components/questionAnalytics/quizAnalytics/QuizAnalytics'

function App() {
  let route = createBrowserRouter([
    {path:"/",element:<HomePage/>,children:[
      {path:'dashboard',element:<Dashboard/>},
      {path:'analytics',element:<Analytics/>},
      {path:'analytics/quiz/:quizId',element:<QuizAnalytics/>},
      {path:'createquiz',element:<CreateQuiz/>},
    ]},
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
