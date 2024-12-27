// ReceiveSocketTest.jsx (Receiver)

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import toast from 'react-hot-toast';

export default function ReceiveSocketTest() { // renamed component for clarity // edited
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:8085", { // updated port to match server // edited
      withCredentials: true, // ensure cookies are sent // added
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected:", newSocket.id);
    });

    // newSocket.on("serverResponse", (data) => {
    //   console.log("From server:", data);
    // });

    // newSocket.on("hamada", (msg) => {
    //   console.log("From server:", msg);
    // });

    newSocket.on("receiveNotification", (data) => { // edited
      console.log("From server:", data);
      toast.success(data.msg); // added
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const handleClick = () => { };

  return (
    <div className="vh-100 text-center mt-5">
      <button onClick={handleClick} className="btn btn-primary">
        Receive Socket Event
      </button>
    </div>
  );
}
