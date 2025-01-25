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
import Book from "./Components/Book A Table/Book";
import UserProfile from "./Components/UserProfile/UserProfile";
import UpdateUser from "./Components/UpdateUser/UpdateUser";
import Admin from "./Components/Admin/Admin";
import Socket from "./Components/SocketTest/Socket";
import AdminLayout from "./Components/AdminLayout/AdminLayout";
import AdminMenu from "./Components/AdminMenu/AdminMenu";
import ReceiveSocket from "./Components/ReceiveSocket/ReceiveSocket";
import { SocketProvider } from "./Context/SocketContext"; //added
import AdminContact from "./Components/AdminContact/AdminContact";
import BookingAdmin from "./Components/BookingAdmin/BookingAdmin";
import AdminUsers from "./Components/AdminUsers/AdminUsers";
import Upload from "./Components/test/Upload";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import NewPassword from "./Components/NewPassword/NewPassword";



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
      { path: "book", element: <Book /> },
      { path: "userprofile", element: <UserProfile /> },
      { path: "updateuser", element: <UpdateUser /> },
      { path: "admin", element: <Admin /> },
      { path: "socket", element: <Socket /> },
      { path: "receive-socket", element: <ReceiveSocket /> },
      { path: "upload", element: <Upload /> },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "menu", element: <AdminMenu /> },
      { path: "contact", element: <AdminContact /> },
      { path: "booking", element: <BookingAdmin /> },
      { path: "users", element: < AdminUsers/> },
    ],
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {path: "register", element: <Register />},
      {path: "login", element: <Login />},
      {path: "loginpassword", element: <LoginPassword />},
      {path: "forgetpassword", element: <ForgetPassword />},
      {path: "newpassword", element: <NewPassword />},
      {path: "otp", element: <Otp />},
    ]
  }


]);



function App() {
  return (
    <>
    <UserContextProvider>
    <SocketProvider> {/*added: Wrap with SocketProvider*/}
          <RouterProvider router={route}></RouterProvider>
          <Toaster />
        </SocketProvider> {/*added*/}
    </UserContextProvider>
    </>
  );
}

export default App;
