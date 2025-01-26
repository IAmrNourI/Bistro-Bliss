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
            <Link to="book" className="bt bok me-3 text-decoration-none">
              <button className="bookBtn">
                Book A Table
                <span></span>
                <span></span>
                </button>
            </Link>
            <Link to="menu" className="bt menu">
              <button className="">Explore Menu</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
