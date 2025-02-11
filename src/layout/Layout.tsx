import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import React from "react";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <main>
      <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;