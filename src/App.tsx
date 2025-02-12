import { RouterProvider } from "react-router";
import router from "./routes/Router";
import "./styles/global.scss";
import ShowBookings from "./components/ShowBookings";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      {/* <ShowBookings /> */}
    </>
  );
}

export default App;
