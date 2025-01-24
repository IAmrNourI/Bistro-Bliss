import React, { useEffect } from 'react'
import Hero from '../Hero/Hero'
import MenuCategories from '../MenuCategories/MenuCategories'
import FastFood from '../FastFood/FastFood'
import { useLocation } from 'react-router-dom'

export default function Home() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0,0)
  }, [pathname]);
  
  return (
      <>
      <Hero />
      <MenuCategories />
      <FastFood />
      </>
  )
}
