import React, { useEffect, useState } from "react";


import { acceptBooking, //   getAllBooking,//   getBooking,
rejectBooking
} from "../../network/user.api";
import toast from "react-hot-toast";
import { useSocket } from "../../Context/SocketContext"; //added

export default function BookingAdmin() {
  const [booking, setbooking] = useState([]);
  const socket = useSocket();

  async function showBooking() {
    const result = await getAllBooking()
      .then((res) => {
        console.log(res);
        const bookingData = res.data.data.map((book) => {
          const dateTime = new Date(book.date_time);
          const hours = dateTime.getHours();
          const minutes = dateTime.getMinutes();
          const time = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;

          return {
            ...book,
            time,
          };
        });
        setbooking(bookingData);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  async function accept(id, userId) {
    const result = await acceptBooking(id)
      .then((res) => {
        showBooking();
        //---------------------
        if (socket) {
          socket.emit("notification", {
            targetUserId: userId,
            msg: "Your booking has been accepted.",
          });
          toast.success("Notification sent!");
        } else {
          toast.error("Socket not connected.");
        }
        //-----------------------
      })
      .catch((res) => {
        console.log(res);
      });
  }

  async function reject(id, userId) {
    const result = await rejectBooking(id)
      .then((res) => {
        console.log(userId);

        // console.log(res)
        // toast.success(res.data)
        showBooking();

        //---------------------
        if (socket) {
          socket.emit("notification", {
            targetUserId: userId,
            msg: "Your booking has been rejected.",
          });
          toast.success("Notification sent!");
        } else {
          toast.error("Socket not connected.");
        }
        //-----------------------
      })
      .catch((res) => {
        // console.log(res);
      });
  }

  useEffect(() => {
    showBooking();
  }, []);

  return (
    <>
      <div className="col-10 mt-3">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-12">
                <table className="table table-bordered pb-5 ">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Date</th>
                      <th scope="col">Time</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  {booking.map((book) => {
                    return (
                      <tbody className="table-row">
                        <tr>
                        <td>
                            {book.user.name}
                          </td>
                          <td>
                            {new Date(book.date_time).toLocaleDateString()}
                          </td>
                          <td>{book.time}</td>
                          <td
                            className={
                              book.status == "Pending" ? "bg-warning" : null
                            }
                          >
                            {book.status}
                          </td>
                          <td>
                            <button
                              onClick={() => accept(book._id, book.user._id)}
                              className="btn btn-outline-success me-2"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => reject(book._id, book.user._id)}
                              className="btn btn-outline-danger"
                            >
                              Reject
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
