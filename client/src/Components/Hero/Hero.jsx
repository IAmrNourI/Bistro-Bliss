import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <>
      <section className="hero">
        <div className="hero-content text-center">
          <h1 className="hero-title">Best food for your taste</h1>
          <p className="hero-info">
            Discover delectable cuisine and unforgettable moments in our
            welcoming, culinary haven.
          </p>
          <div className="btns-hero d-flex justify-content-center">
            <Link to="book" className="bt bok me-3">
              <span className="text-black textBook">Book A Table</span>
              <div className="wave"></div>
              <div className="waveup"></div>
            </Link>
            <Link to="menu" className="bt menu">
              <span className="text-white textMenu">Explore Menu</span>
              <div className="swave"></div>
              <div className="swavedown"></div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
