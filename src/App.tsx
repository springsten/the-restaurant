import { RouterProvider } from "react-router";
import router from "./routes/Router";
import "./styles/global.scss";
import ShowBooking from "./components/ShowBooking";
import { CreateBooking } from "./pages/CreateBooking";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <CreateBooking />
    </>
  );
}

export default App;
