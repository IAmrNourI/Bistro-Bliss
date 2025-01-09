import React, { useEffect } from "react";
import HealthyFood from "../healthyFood/healthyFood";
import Guest from "../Guest/Guest";
import Feedback from "../Feedback/Feedback";
import { useLocation } from "react-router-dom";


export default function About() {
  const { pathname } = useLocation;
  useEffect(() => {
    window.scrollTo(0,0)
  }, [pathname])
  return (
    <>
      <HealthyFood />
      <Guest />
      <Feedback  />
    </>
  );
}
