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
import Otp from "./Components/Otp/Otp";
import UserContextProvider from "./Context/UserContext";


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
      {path: "otp", element: <Otp />},
    ]
  }
]);



function App() {
  return (
    <>
    <UserContextProvider>
      <RouterProvider router={route}></RouterProvider>
    </UserContextProvider>
    </>
  );
}

export default App;
