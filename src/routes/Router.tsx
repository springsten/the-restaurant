import { createBrowserRouter } from "react-router";
import Layout from "../layout/Layout";
import Booking from "../pages/Booking";
import Contact from "../pages/Contact";
import Home from "../pages/Home";
import AdminDashboard from "../pages/AdminDashboard";
import NewAdminDashboard from "../pages/NewAdminDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/booking", element: <Booking /> },
      { path: "/contact", element: <Contact /> },
      { path: "/admin", element: <NewAdminDashboard /> },
    ],
  },
]);

export default router;
