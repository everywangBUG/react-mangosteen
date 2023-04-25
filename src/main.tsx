import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ErrorPage } from './components/errorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Hello Router</h1>,
    errorElement: <ErrorPage />
  }
])
const div = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(div)
root.render(
  // <React.StrictMode>
  <RouterProvider router={router}/>
  // </React.StrictMode>
)
