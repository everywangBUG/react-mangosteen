import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Hello Router</h1>
  }
])
const div = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(div)
root.render(
  // <React.StrictMode>
  <RouterProvider router={router}/>
  // </React.StrictMode>
)
