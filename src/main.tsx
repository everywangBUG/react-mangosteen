import React from 'react'
import ReactDOM from 'react-dom/client'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ErrorPage } from './components/errorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Hello Router<Outlet /></h1>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <div>请选择 1 2 3</div>
      },
      {
        path: '1',
        element: <div>1</div>
      },
      {
        path: '2',
        element: <div>2</div>
      },
      {
        path: '3',
        element: <div>3</div>
      }
    ]
  }
])
const div = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(div)
root.render(
  // <React.StrictMode>
  <RouterProvider router={router}/>
  // </React.StrictMode>
)
