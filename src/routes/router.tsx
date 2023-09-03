import { createBrowserRouter } from 'react-router-dom'
import { ErrorPage } from '../components/ErrorPage'
import { Home } from '../pages/Home'
import { App } from '../App'
import { welcomeRoute } from './welcomeRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      welcomeRoute
    ]
  },
])
