import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskForm from './components/TaskForm'
import Navbar from './components/NavBar/Navbar'

function App() {
  const [count, setCount] = useState(0)
  

  return (
    <div className='min-h-screen flex flex-col gap-20 bg-linear-to-r from-indigo-50 via-purple-50 to-pink-50'>
      <Navbar/>
      <TaskForm/>
    </div>
  )
}

export default App
