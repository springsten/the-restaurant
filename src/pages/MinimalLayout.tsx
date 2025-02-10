import { NavLink, Outlet } from "react-router";
import "./../styles/Layout.css";

export const MinimalLayout = () => {
  return (
    <div className="minimal-layout">
      <nav className="navbar">
        <ul>
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/about"}>About</NavLink>
          </li>
          <li>
            <NavLink to={"/contact"}>Contact</NavLink>
          </li>
          <li>
            <NavLink to={"/booking"}>Booking</NavLink>
          </li>
        </ul>
      </nav>
      <main className="maincontainer">
        <Outlet />
      </main>
      <footer>footer</footer>
    </div>
  );
};
