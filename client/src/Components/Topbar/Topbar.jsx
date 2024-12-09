import React from "react";
export default function Topbar() {
  return (
    <>
      <section className="topBar">
        <div className="container">
          <div className="contact-us d-flex justify-content-between">
            <div className="call-us d-flex">
              <div className="d-flex align-items-center me-4">
                <i class="fa-solid fa-phone mx-2"></i>
                <p className="p-e">(414) 857 - 0107</p>
              </div>

              <div className="d-flex align-items-center">
                <i class="fa-regular fa-envelope mx-2"></i>
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
            </div>

            
          </div>
        </div>
      </section>
    </>
  );
}
