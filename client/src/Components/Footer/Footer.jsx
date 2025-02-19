import React from 'react'
import logo from '../../assets/logo.png'
import imgOne from '../../assets/footer-one.png'
import imgTow from '../../assets/footer-tow.png'
import imgThree from '../../assets/footer-three.png'
import imgFour from '../../assets/footer-four.png'
import footerLogo from '../../assets/footer-logo.png'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (

        <>
        
        <section className='footer p-5'>
          <div className="container">
            <div className="row">

              <div className="col-lg-4 col-md-6">
                <div className="footer-item">
                    <img src={footerLogo} alt="jabaness food" className="mb-4"/>
                    <a className="navbar-brand logo ms-3 text-white " href="#">
                      Bistro Bliss
                    </a>
                    
                    <p className='text-footer-color'>In tje new era of technology we look a in the future with
                      certainty and pride to for our company
                    </p>
                    

                  <div className="social d-flex">
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

              <div className="col-lg-2 col-md-6">
                <ul className='footer-list p-0'>
                  <li className='text-white mb-3 fw-500 pages'>Pages</li>
                  <Link className='footer-link' to="/">Home</Link>
                  <Link className='footer-link' to="about">About</Link>
                  <Link className='footer-link' to="menu">Menu</Link>
                  <Link className='footer-link' to="contact">Contact</Link>
                  <Link className='footer-link' to="cart">Cart</Link>
                  <Link className='footer-link' to="wishlist">WishList</Link>
                </ul>
              </div>

              <div className="col-lg-2 col-md-6">
                <ul className='footer-list p-0'>
                  <li className='text-white mb-3 fw-500 '>Utility Pages</li>
                  <li>Start Hero</li>
                  <li>Styleguide</li>
                  <li>Pasword Protected</li>
                  <li>404 Not Found</li>
                  <li>Licenses</li>
                  <li>Changeiog</li>
                </ul>
              </div>

              <div className="col-lg-4 col-md-6">
                <p className='text-white fw-500 p-f'>Follow Us On Instagram</p>
                <div className='footer-imgs'>
                  <img className='w-50' src={imgOne} alt="" />
                  <img className='w-50' src={imgTow} alt="" />
                  <img className='w-50' src={imgThree} alt="" />
                  <img className='w-50' src={imgFour} alt="" />
                </div>
              </div>


            </div>
            

            <div className='but-footer'>
              <span className='line d-flex'></span>
              <div className='d-flex justify-content-center text-center'>
              <p className='text-footer-color mt-4'>
              Copyright © 2023 #AmrNour #FathyAbdelhamid. All Rights Reserved
            </p>
              </div>
            </div>
          </div>
        </section>
        
        </>
        
  )
}
