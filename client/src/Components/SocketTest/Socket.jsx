// src/Components/SocketTest/SocketTest.jsx

import React from "react";
import { useSocket } from "../../Context/SocketContext"; //added
import toast from 'react-hot-toast';

export default function SocketTest() {
  const socket = useSocket(); 

  const handleClick = () => {
    if (socket) { 
      socket.emit("notification", { 
        targetUserId: "675ffb9fec849012a52bb95f", 
        msg: "Your booking has been rejected."
      }); 
      toast.success("Notification sent!"); 
    } else {
      toast.error("Socket not connected."); 
    }
  };

  return (
    <div className="vh-100 text-center mt-5">
      <button onClick={handleClick} className="btn btn-primary">Send Socket Event</button>
    </div>
  );
}
