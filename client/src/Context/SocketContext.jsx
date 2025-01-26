

import React, { createContext, useContext, useEffect, useState } from "react"; //added
import { io } from "socket.io-client";
import toast from 'react-hot-toast';

const SocketContext = createContext();


export const useSocket = () => useContext(SocketContext); 


export const SocketProvider = ({ children }) => { 
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
      if(data.msg === "Your booking has been accepted.") {
        toast.success(data.msg); 
      } else if(data.msg === "Your booking has been rejected.") {
        toast.error(data.msg);
      }else{
        toast.success(data.msg);
      }
    });

    newSocket.on("disconnect", () => { 
      console.log("Socket disconnected:", newSocket.id); 
    });

    return () => { 
      newSocket.close(); 
    };
  }, []); 

  return (
    <SocketContext.Provider value={socket}> 
      {children}
    </SocketContext.Provider>
  ); 
};
