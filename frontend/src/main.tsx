import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import MyContextApp from './components/context/MyContextApp.tsx'

createRoot(document.getElementById('root')!).render(
   <MyContextApp>
    <App />
   </MyContextApp>
 
)
