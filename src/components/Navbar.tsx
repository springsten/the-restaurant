import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        Mizu<span className="logo-highlight">スイ</span>
      </div>
      <ul>
        <li><a href="/booking">Boka</a></li>
        <li><a href="/contact">Kontakt</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
