// Receive SocketTest.jsx
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import toast from 'react-hot-toast'

export default function SocketTest() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:8085", {
      withCredentials: true,
    });
    setSocket(newSocket);

    newSocket.on("receiveNotification", (data) => {
      toast.success(data.msg);
      console.log("From server:", data);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const handleClick = () => {   
    if (socket) {

    }
  };

  return (
    <div className="vh-100 text-center mt-5">
      <button onClick={handleClick} className="btn btn-primary">
        Receive Socket Event
      </button>
    </div>
  );
}
