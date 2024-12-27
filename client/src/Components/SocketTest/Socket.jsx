// SocketTest.jsx (Sender)

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import toast from 'react-hot-toast';

export default function SocketTest() {
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

    return () => {
      newSocket.close();
    };
  }, []);

  const handleClick = () => {
    if (socket) {
      // Emit 'notification' with targetUserId and message // edited
      socket.emit("notification", { 
        targetUserId: "675ffb9fec849012a52bb95f", // replace with the actual user ID // added
        msg: "Notificatioooons" 
      }); // edited
    }
  };

  return (
    <div className="vh-100 text-center mt-5">
      <button onClick={handleClick} className="btn btn-primary">Send Socket Event</button>
    </div>
  );
}
