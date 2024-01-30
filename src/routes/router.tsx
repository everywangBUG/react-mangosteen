import { createBrowserRouter } from 'react-router-dom'
import { ErrorPage } from '../components/ErrorPage'
import { Home } from '../pages/Home'
import { Root } from '../components/Root'
import { Items } from '../pages/Itmes'
import { SignIn } from '../pages/SignIn'
import { ItemsNew } from '../pages/ItemsNew'
import { TagsNew } from '../pages/TagsNew'
import { TagsEditNew } from '../pages/TagsEditNew'
import { Statistics } from '../pages/Statistics'
import { welcomeRoute } from './welcomeRoute'

export const router = createBrowserRouter([
  { path: '/', element: <Root /> },
  { path: '/home', element: <Home title='首页' /> },
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      welcomeRoute
    ]
  },
  { path: '/items', element: <Items /> },
  { path: '/items/new', element: <ItemsNew /> },
  { path: '/tags/new', element: <TagsNew /> },
  { path: '/tags/:id', element: <TagsEditNew /> },
  { path: '/sign_in', element: <SignIn /> },
  { path: '/statistics', element: <Statistics /> },
  { path: '/export', element: <div>不做</div> },
  { path: '/tags', element: <div>标签</div> },
  { path: '/noty', element: <div>不做</div> },
])
