import { createBrowserRouter, Outlet } from "react-router-dom";
import { ErrorPage } from "../components/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (<div>home</div>),
    errorElement: <ErrorPage />
  },
  {
    path: "/welcome",
    errorElement: <ErrorPage />,
    element: <div>welcome<Outlet /></div>,
    children: [
      {
        path: '1',
        element: <div>1</div>,
      },
      {
        path: '2',
        element: <div>2</div>,
      },
      {
        path: '3',
        element: <div>3</div>,
      },
      {
        path: '4',
        element: <div>4</div>,
      },
      {
      }
    ]
  }
]) 
