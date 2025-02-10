import { createBrowserRouter } from "react-router";
import { Layout } from "../pages/Layout";
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { Contact } from "../pages/Contact";
import { Booking } from "../pages/Booking";
import { MinimalLayout } from "../pages/MinimalLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/",
    element: <MinimalLayout />,
    children: [
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/booking",
        element: <Booking />,
      },
    ],
  },
]);
