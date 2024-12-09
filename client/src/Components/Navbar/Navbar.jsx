import React from "react";
import logo from '../../assets/logo.png'
import { Link, useNavigate } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <header>
      <nav className="navbar navbar-expand-lg bg">
        <div className="container">
          <img src={logo} alt="jabaness food" className="mb-2"/>
          <a className="navbar-brand logo ms-3" href="#">
            Bistro Bliss
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-5 w-100  mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <Link className="nav-link active" aria-current="page" to="">
                  Home
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link" to="">
                  About
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link" to="">
                  Menu
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link" to="">
                  Pages
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link" to="">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <button className="book-table">Book A Table</button>
        </div>
      </nav>
      </header>
    </>
  );
}
