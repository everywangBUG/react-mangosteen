import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "../components/ErrorPage";
import { WelcomeLayout } from "../layout/WelconeLayout";
import { Welcome1 } from "../layout/Welcome1";
import { Welcome2 } from '../layout/Welcome2';
import { Welcome3 } from "../layout/Welcome3";
import { Welcome4 } from "../layout/Welcome4";
import { MainLayout } from "../layout/MainLayout";
import { RedirectToWelcome } from "../components/RedirectToWelcome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <RedirectToWelcome />
  },
  {
    path: "/welcome",
    errorElement: <ErrorPage />,
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
      },
      {
      }
    ]
  }
]) 
