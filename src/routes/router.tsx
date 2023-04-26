import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { RedirectToWelcome } from '../components/Redirect'
import { Welcome1 } from '../pages/Welcome1'
import { Welcome2 } from '../pages/Welcome2'
import { Welcome3 } from '../pages/Welcome3'
import { Welcome4 } from '../pages/Welcome4'
import { MainLayout } from '../layouts/MainLayout'
import { WelcomeLayout } from '../layouts/WelcomeLayout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <RedirectToWelcome />,
    children: [
      {
        path: 'welcome',
        element: <WelcomeLayout />,
        children: [
          { path: '1', element: <Welcome1 /> },
          { path: '2', element: <Welcome2 /> },
          { path: '3', element: <Welcome3 /> },
          { path: '4', element: <Welcome4 /> }
        ]
      },
    ]
  }
])
