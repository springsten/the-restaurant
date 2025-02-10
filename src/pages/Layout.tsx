import { NavLink, Outlet } from "react-router";
import "./../styles/Layout.css";

export const Layout = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="gridcontainer">
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
        {/* <div id="sidebar">sidebar</div>
        <div id="content1">content1</div>
        <div id="content2">content2</div>
        <div id="content3">content3</div> */}

        <footer className="footercontainer">
          <div className="socialicons">
            <span>
              <i className="fa-brands fa-github"></i>
            </span>
            <span>
              <i className="fa-brands fa-twitter"></i>
            </span>
            <span>
              <i className="fa-brands fa-facebook"></i>
            </span>
          </div>
          <div className="copyright">
            <p>&copy; {currentYear}</p>
          </div>
        </footer>
      </div>
    </>
  );
};
