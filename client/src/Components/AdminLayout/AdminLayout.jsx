import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import Topbar from "../Topbar/Topbar";
import AdminPanal from "../Sidebar/AdminPanal";

export default function Layout() {
  return (
    <>
      <Topbar />
      <Navbar />

        <div className="container-fluid">
            <div className="row">
                <AdminPanal />
                <Outlet />
            </div>
        </div>

    </>
  );
}
