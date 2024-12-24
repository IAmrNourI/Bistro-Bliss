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
import { Toaster } from 'react-hot-toast';
import About from "./Components/About/About";
import Menu from "./Components/Menu/Menu";
import Add from "./Components/AddItem/Add";
import Edit from "./Components/EditItem/Edit";
import Contact from "./Components/Contact/Contact";


let route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "Menu", element: <Menu /> },
      { path: "add", element: <Add /> },
      { path: "edit", element: <Edit /> },
      { path: "contact", element: <Contact /> },
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
      <Toaster />
    </UserContextProvider>
    </>
  );
}

export default App;
