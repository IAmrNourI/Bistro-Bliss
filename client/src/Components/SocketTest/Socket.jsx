// SocketTest.jsx (Sender)

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import toast from 'react-hot-toast';

export default function SocketTest() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:8085", {
      withCredentials: true, 
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected:", newSocket.id);
    });


    return () => {
      newSocket.close();
    };
  }, []);

  const handleClick = () => {
    if (socket) {
      socket.emit("notification", { 
        targetUserId: "675ffb9fec849012a52bb95f",
        msg: "your booking have been Accepted" 
      }); 
    }
  };

  return (
    <div className="vh-100 text-center mt-5">
      <button onClick={handleClick} className="btn btn-primary">Send Socket Event</button>
    </div>
  );
}
