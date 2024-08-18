import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage() {
    let navigate = useNavigate()

    useEffect(()=>{
        navigate('/auth/login')
    },[])
  return (
    <div>HomePage</div>
  )
}

export default HomePage