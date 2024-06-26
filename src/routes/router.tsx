import { Outlet, createHashRouter } from 'react-router-dom'
import type { AxiosError } from 'axios'
import { ErrorPage } from '../pages/ErrorPage'
import { Home } from '../pages/Home'
import { Root } from '../components/Root'
import { Items } from '../pages/Items'
import { SignIn } from '../pages/SignIn'
import { ItemsNew } from '../pages/ItemsNew'
import { TagsNew } from '../pages/TagsNew'
import { TagsEditNew } from '../pages/TagsEditNew'
import { Statistics } from '../pages/Statistics'
import { ItemsErrors } from '../pages/itemsError'
import { ErrorEmptyData, ErrorUnauthorized } from '../constants/itemErrors'
import { ajax } from '../lib/ajax'
import { welcomeRoute } from './welcomeRoute'

export const router = createHashRouter([
  { path: '/', element: <Root /> },
  { path: '/home', element: <Home title='首页' /> },
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      welcomeRoute
    ]
  },
  // 需要登录才可见的页面
  {
    path: '/',
    element: <Outlet />,
    errorElement: <ErrorPage />,
    loader: async () => {
      return await ajax.get<IResource<IUser>>('/api/v1/me').catch((e) => {
        if (e.response?.status === 401) {
          throw new ErrorUnauthorized()
        }
        throw e
      })
    },
    children: [
      {
        path: '/items',
        element: <Items />,
        errorElement: <ItemsErrors />,
        loader: async () => {
          // const onError = (error: AxiosError) => {
          //   if (error.response?.status === 401) {
          //     throw new ErrorUnauthorized()
          //   }
          //   throw error
          // }
          // const response = await ajax.get<IResources<IItems>>('/api/v1/items?page=1').catch(onError)
          // if (response.data.resources.length > 0) {
          //   return response.data
          // } else {
          //   throw new ErrorEmptyData()
          // }
          try {
            const response = await ajax.get<IResources<IItems>>('/api/v1/items?page=1')
            if (response.data.resources.length > 0) {
              return response.data
            } else {
              throw new ErrorEmptyData()
            }
          } catch (error) {
            const e = error as AxiosError
            if (e.response?.status === 401) {
              throw new ErrorUnauthorized()
            }
            throw e
          }
        }
      },
      { path: '/items/new', element: <ItemsNew />, },
      { path: '/tags/new', element: <TagsNew /> },
      { path: '/tags/:id', element: <TagsEditNew /> },
      { path: '/statistics', element: <Statistics /> },
      { path: '/export', element: <div>不做</div> },
      { path: '/tags', element: <div>标签</div> },
      { path: '/noty', element: <div>不做</div> },
    ]
  },
  { path: '/sign_in', element: <SignIn /> },
])
