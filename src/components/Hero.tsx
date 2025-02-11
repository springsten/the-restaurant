
import React from "react";
import { NavLink } from "react-router";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Små rätter, stora smaker</h1>
        <p>
          Upplev det bästa från det japanska köket – noggrant utvalda smårätter, 
          perfekt balanserade smaker.
        </p>
        <NavLink to="/booking" className="hero-button">Boka bord</NavLink>
      </div>
    </section>
  );
};

export default Hero;

