import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "../components/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (<div>home</div>),
    errorElement: <ErrorPage />
  },
]) 
