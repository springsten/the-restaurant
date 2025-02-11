import { Link, NavLink } from "react-router";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link className="logo" to="/">
        Mizu<span className="logo-highlight">スイ</span>
      </Link>
      <ul>
        <li>
          <NavLink to={"/booking"}>Boka</NavLink>
        </li>
        <li>
          <NavLink to={"/contact"}>Kontakt</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
