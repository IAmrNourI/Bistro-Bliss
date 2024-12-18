import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Topbar() {

  let {setuserLogin} = useContext(UserContext)
  let navigate = useNavigate()

  function signout(){
    localStorage.removeItem("userToken");
    setuserLogin(null)
    navigate("/auth/login")
  }

  return (
    <>
      <section className="topBar">
        <div className="container">
          <div className="contact-us d-flex justify-content-between">
            <div className="call-us d-flex">
              <div className="d-flex align-items-center me-4">
                <i className="fa-solid fa-phone mx-2"></i>
                <p className="p-e">(414) 857 - 0107</p>
              </div>

              <div className="d-flex align-items-center">
                <i className="fa-regular fa-envelope mx-2"></i>
                <p className="p-e">Jab_food@bistrobliss</p>
              </div>
            </div>

            <div className="social d-flex justify-content-center align-items-center">
              <a href="#">
                <i className="fa-brands fa-twitter text-white"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-facebook-f text-white"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-instagram text-white"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-github text-white"></i>
              </a>
              
              <span onClick={signout} className="ms-3 cursor-pointer">Sign out <i className="fa-solid fa-arrow-right ms-1"></i></span>
            </div>


            
          </div>
        </div>
      </section>
    </>
  );
}
