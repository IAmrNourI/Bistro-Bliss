import React, { useContext, useEffect, useState } from "react";
import logo from '../../assets/logo.png'
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";


export default function Navbar() {
  const [activeLink, setactiveLink] = useState("home")
  let {userLogin,setuserLogin} = useContext(UserContext)

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setuserLogin(true); 
    } else {
      setuserLogin(null); 
    }

  }, [])
  
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
            {userLogin == true ? <>            
            <ul className="navbar-nav ms-5 w-100  mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <Link className={activeLink === "home" ? "active nav-link" : "nav-link"}
                onClick={() => setactiveLink("home")}
                aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className={activeLink === "about" ? "active nav-link" : "nav-link"}
                onClick={() => setactiveLink("about")}
                to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className={activeLink === "menu" ? "active nav-link" : "nav-link"}
                onClick={() => setactiveLink("menu")}
                to="/menu">
                  Menu
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className={activeLink === "contact" ? "active nav-link" : "nav-link"} 
                onClick={() => setactiveLink("contact")}
                to="/contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className={activeLink === "cart" ? "active nav-link" : "nav-link"} 
                onClick={() => setactiveLink("cart")}
                to="/cart">
                  Cart
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className={activeLink === "wishList" ? "active nav-link" : "nav-link"} 
                onClick={() => setactiveLink("wishList")}
                to="/wishList">
                  WishList
                </Link>
              </li>
            </ul>
            <Link to="book" className="book-table">Book A Table <div className="wave"></div> </Link> </> :             
            <>
                <div className="ms-auto">
                <Link className="pe-3" to="/auth/register">
                  Register
                </Link>
                <Link to="/auth/login">
                  Login
                </Link>
                </div>
            </>}
          </div>
          {/* <button className="book-table">Book A Table</button> */}
          
        </div>

        
      </nav>
      </header>
    </>
  );
}
