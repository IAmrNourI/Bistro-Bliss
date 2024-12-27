// ReceiveSocketTest.jsx (Receiver)

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import toast from 'react-hot-toast';

export default function ReceiveSocketTest() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:8085", { 
      withCredentials: true, 
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected:", newSocket.id);
    });


    newSocket.on("receiveNotification", (data) => { 
      console.log("From server:", data);
      toast.success(data.msg); 
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
