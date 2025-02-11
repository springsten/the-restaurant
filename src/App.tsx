import { RouterProvider } from "react-router";
import router from "./routes/Router";
import "./styles/global.scss";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
