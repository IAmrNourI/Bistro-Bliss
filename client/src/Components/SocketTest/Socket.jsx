// SocketTest.jsx
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

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

    newSocket.on("serverResponse", (data) => {
      console.log("From server:", data);
    });

    newSocket.on("hamada", (msg) => {
        console.log("From server:", msg);
    })

    return () => {
      newSocket.close();
    };
  }, []);

  const handleClick = () => {
    if (socket) {
      socket.emit("someEvent", { msg: "Hello from React!" });
    }
  };

  return (
    <div className="vh-100 text-center mt-5">
      <button onClick={handleClick} className="btn btn-primary">Send Socket Event</button>
    </div>
  );
}


// return (
//     <>
//       <div className="vh-100 text-center mt-5">
//         <button onClick={hello} className="btn btn-primary">
//           Socket
//         </button>
//       </div>
//     </>
//   );