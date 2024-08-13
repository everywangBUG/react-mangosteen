import { createBrowserRouter, Outlet } from "react-router-dom";
import { ErrorPage } from "../components/ErrorPage";
import { WelcomeLayout } from "../layout/WelcomeLayout";
import { Welcome1 } from "../layout/Welcome1";
import { Welcome2 } from "../layout/Welcome2";
import { Welcome3 } from "../layout/Welcome3";
import { Welcome4 } from "../layout/Welcome4";
import { RedirectToWelcome } from "../components/RedirectToWelcome";
import { Home } from "../views/Home";
import { Items } from "../views/Items";
import { ItemsNew } from "../views/ItemsNew";
import { SignIn } from "../views/SignIn";
import { getItems } from "../service/views/items/Items";
import { getCurrentUser } from "../service/views/signIn/SignIn";
import { TagsNew } from "../views/TagsNew";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RedirectToWelcome />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/welcome",
    errorElement: <RedirectToWelcome />,
    element: <WelcomeLayout />,
    children: [
      {
        path: "1",
        element: <Welcome1 />,
      },
      {
        path: "2",
        element: <Welcome2 />,
      },
      {
        path: "3",
        element: <Welcome3 />,
      },
      {
        path: "4",
        element: <Welcome4 />,
      }
    ]
  },
  {
    path: "/",
    errorElement: <ErrorPage />,
    loader: async () => {
      return await getCurrentUser()
    },
    element: <Outlet />,
    children: [
      {
        path: "/items",
        errorElement: <ErrorPage />,
        loader: async () => {
          return await getItems({ page: 1 })
        },
        element: <Items />
      },
      {
        path: "/items/new",
        errorElement: <ErrorPage />,
        element: <ItemsNew />,
      },
    ]
  },
  {
    path: "tags/new",
    errorElement: <ErrorPage />,
    element: <TagsNew />
  },
  {
    path: "/home",
    errorElement: <ErrorPage />,
    element: <Home />
  },
  {
    path: "/sign_in",
    errorElement: <ErrorPage />,
    element: <SignIn />
  }
]) 
