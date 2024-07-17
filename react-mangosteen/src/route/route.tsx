import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "../components/ErrorPage";
import { WelcomeLayout } from "../layout/WelcomeLayout";
import { Welcome1 } from "../layout/Welcome1";
import { Welcome2 } from '../layout/Welcome2';
import { Welcome3 } from "../layout/Welcome3";
import { Welcome4 } from "../layout/Welcome4";
import { RedirectToWelcome } from "../components/RedirectToWelcome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RedirectToWelcome />,
    errorElement: <RedirectToWelcome />,
  },
  {
    path: "/welcome",
    errorElement: <RedirectToWelcome />,
    element: <WelcomeLayout />,
    children: [
      {
        path: '1',
        element: <Welcome1 />,
      },
      {
        path: '2',
        element: <Welcome2 />,
      },
      {
        path: '3',
        element: <Welcome3 />,
      },
      {
        path: '4',
        element: <Welcome4 />,
      }
    ]
  },
  {
    path: '/home',
    errorElement: <ErrorPage />,
    element: <div>首页</div>
  }
]) 
