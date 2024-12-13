import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import AuthLayout from "./Components/AuthLayout/AuthLayout";
import LoginPassword from "./Components/LoginPassword/LoginPassword";
import Ottp from "./Components/Ottp/Ottp";

let route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
    ],
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {path: "register", element: <Register />},
      {path: "login", element: <Login />},
      {path: "loginpassword", element: <LoginPassword />},
      {path: "ottp", element: <Ottp />},
    ]
  }
]);



function App() {
  return (
    <>
      <RouterProvider router={route}></RouterProvider>
    </>
  );
}

export default App;
