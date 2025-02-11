import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

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