import { createBrowserRouter } from "react-router-dom";
import  Layout  from "../layout/Layout";
import  Booking from "../pages/Booking";
import  Contact from "../pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "booking", element: <Booking /> },
      { path: "contact", element: <Contact /> },
    ],
  },
]);

export default router;