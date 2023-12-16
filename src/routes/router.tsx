import { createBrowserRouter } from 'react-router-dom'
import { ErrorPage } from '../components/ErrorPage'
import { Home } from '../pages/Home'
import { App } from '../App'
import { Items } from '../pages/Itmes'
import { welcomeRoute } from './welcomeRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/home',
    element: <Home title='首页' />
  },
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      welcomeRoute
    ]
  },
  {
    path: '/items',
    element: <Items />
  }
])
