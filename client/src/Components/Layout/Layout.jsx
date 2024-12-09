import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import Topbar from "../Topbar/Topbar";

export default function Layout() {
  return (
    <>
      <Topbar />
      <Navbar />

        <Outlet />

      <Footer />
    </>
  );
}
