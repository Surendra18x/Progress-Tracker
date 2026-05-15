import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Tasks from './pages/Tasks.jsx'
import Goals from './pages/Goals.jsx'
import GoalDetail from './pages/GoalDetail.jsx'
import Habits from './pages/Habits.jsx'
import Stats from './pages/Stats.jsx'
import Settings from './pages/Settings.jsx'
import Error from './components/layout/Error.jsx'
import { createBrowserRouter , RouterProvider} from 'react-router-dom'

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/tasks',
        element:<Tasks/>
      },
      {
        path:'/goals',
        element:<Goals/>
      },
      {
        path:'/goals/:goalId',
        element:<GoalDetail/>
      },
      {
        path:'/habits',
        element:<Habits/>
      },
      {
        path:'/stats',
        element:<Stats/>
      },
      {
        path:'/settings',
        element:<Settings/>
      },
    ],
    errorElement:<Error/>
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter}/>
  </StrictMode>,
)
