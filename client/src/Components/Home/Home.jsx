import React, { useContext, useEffect, useState } from 'react'
import Hero from '../Hero/Hero'
import MenuCategories from '../MenuCategories/MenuCategories'
import FastFood from '../FastFood/FastFood'
import { useLocation } from 'react-router-dom'


export default function Home() {
  const { pathname } = useLocation();

  useEffect(() => {

    window.scrollTo(0,0)
  }, [pathname]);

  useEffect(() => {
    if(localStorage.getItem("notReloaded")){
      setTimeout(() => {
        window.location.reload(true);
        localStorage.removeItem("notReloaded");
      }, 1000);
    }
    // socket
  }, []);
  

  return (
      <>
      <Hero />
      <MenuCategories />
      <FastFood />
      </>
  )
}
