import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { getNotifications, getUser, logOut } from "../../network/user.api";
import toast from "react-hot-toast";

export default function Topbar() {
  let navigate = useNavigate();
  const [user, setuser] = useState([]);
  const [getNotification, setgetNotification] = useState([]);
  const [showNotification, setshowNotification] = useState(false);
  const [isAdmin, setisAdmin] = useState("");
  const [unSeen, setunSeen] = useState(null);
  const [shake, setShake] = useState(false);
  let { userLogin, setuserLogin } = useContext(UserContext);

  async function getUserNotification() {
    const result = await getNotifications()
      .then((res) => {
        setshowNotification(true);
        console.log(res);
        getUserDate();
        const notificationTime = res.data.data.map((time) => {
          let newContent;
          newContent = time.content.split(" ");
          if (newContent[1] == "booking") {
            const bookingStatus =
              time.status === "Accepted" ? "Accepted" : "Rejected";

            const newTime = newContent.slice(4, 9).join(" ");
            const date = new Date(newTime);
            const formattedDate = date.toLocaleString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });
            time.content = `Your booking which at ${formattedDate} has been ${bookingStatus}`;
          }

          const dateTime = new Date(time.createdAt);
          const now = new Date();
          const diffInSeconds = Math.floor((now - dateTime) / 1000);

          let timeAgo;
          if (diffInSeconds < 60) {
            timeAgo = `${diffInSeconds}s ago`;
          } else if (diffInSeconds < 3600) {
            timeAgo = `${Math.floor(diffInSeconds / 60)}m ago`;
          } else if (diffInSeconds < 86400) {
            timeAgo = `${Math.floor(diffInSeconds / 3600)}h ago`;
          } else {
            timeAgo = `${Math.floor(diffInSeconds / 86400)}day ago`;
          }
          return {
            ...time,
            createdAt: timeAgo,
          };
        });

        setgetNotification(notificationTime);
        console.log(getNotification);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  async function getUserDate() {
    const result = await getUser()
      .then((res) => {
        setuser(res.data.data);
        setunSeen(res.data.data.unSeenMessages);
        console.log(res);
        setisAdmin(res.data.data.role);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  async function signout() {
    const result = await logOut()
      .then((res) => {
        console.log(res);
        localStorage.removeItem("userToken");
        setuserLogin(null);
        navigate("/auth/login");
        toast.success(res.data.message);
      })
      .catch((res) => {
        console.log(res);
      });
    navigate("/auth/login");
    localStorage.removeItem("userToken");
  }

  useEffect(() => {
    getUserDate();
  }, []);

  useEffect(() => {
    if (unSeen > 0) {
      const interval = setInterval(() => {
        setShake(true);
        setTimeout(() => setShake(false), 1500);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [unSeen]);

  return (
    <>
      {userLogin != null ? (
        <section className="topBar">
          <div className="container">
            <div className="row">
              <div className="col-xl-6">
                <div className="d-flex align-items-center">
                  <i className="fa-solid fa-phone mx-2"></i>
                  <p className="p-e">(414) 857 - 0107</p>
                  <i className="fa-regular fa-envelope mx-2"></i>
                  <p className="p-e">bisto_bliss@bistrobliss</p>
                </div>
              </div>
              <div className="col-xl-6 d-flex align-items-center justify-content-xl-end justify-content-md-start">
                <div className="social d-flex mt-2 pb-2 d-flex">
                  <a aria-label="twitter" href="#">
                    <i className="fa-brands fa-twitter text-white "></i>
                  </a>
                  <a aria-label="facebook" href="#">
                    <i className="fa-brands fa-facebook-f text-white "></i>
                  </a>
                  <a aria-label="instagram" href="#">
                    <i className="fa-brands fa-instagram text-white "></i>
                  </a>
                  <a aria-label="github" href="#">
                    <i className="fa-brands fa-github text-white "></i>
                  </a>
                  <a
                  aria-label="notification"
                    className={`position-relative ms-3 ${
                      showNotification ? "triangle" : ""
                    }`}
                    onClick={() => {
                      if (!showNotification) getUserNotification();
                      setshowNotification((prev) => !prev);
                    }}
                    href="#"
                  >
                    <span
                      className={
                        user?.unSeenMessages > 0 ? "notificationsNumber " : null
                      }
                    >
                      {unSeen > 0 ? user?.unSeenMessages : null}
                    </span>
                    {showNotification && (
                      <div className="notfication-container position-absolute p-3 ">
                        <h5 className="notfication-text text-black fw-bold">
                          Notification
                        </h5>
                        {[...getNotification].reverse().map((message) => {
                          return (
                            <div
                              className={`message bg-white text-black mt-2 border`}
                            >
                              {" "}
                              {/* ${message.status == "Accepted" ? "border-success": "border-danger"} */}
                              <div
                                className={
                                  message.unSeen
                                    ? "bg-notfication p-1 rounded-2"
                                    : "p-1 rounded-2"
                                }
                              >
                                <p
                                  className="px-2 m-0"
                                  dangerouslySetInnerHTML={{
                                    __html: message.content.replace(
                                      /(Accepted|Rejected|Shipping|Delivered|cancelled|preparing)/g,
                                      (match) =>
                                        `<span class="fw-700 text-decoration-underline text-${
                                          match === "Accepted"
                                            ? "success"
                                            : match === "Rejected"
                                            ? "danger"
                                            : match === "Shipping"
                                            ? "warning"
                                            : match === "Delivered"
                                            ? "primary"
                                            : match === "cancelled"
                                            ? "black"
                                            : "secondary"
                                        }">${match}</span>`
                                    ),
                                  }}
                                />
                                <span className="px-2 text-secondary fw-500 d-block">
                                  {message.createdAt}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <i
                      className={`fa-regular fa-bell text-white shak ${
                        shake ? "shaking" : ""
                      }`}
                    ></i>
                  </a>
                  <Link
                    to="/wishlist"
                    className="cursor-pointer d-flex align-items-center text-white"
                    aria-label="wishlist"
                  >
                    <i class="fa-regular fa-heart"></i>
                  </Link>
                  <Link
                    to="/cart"
                    className="cursor-pointer d-flex align-items-center text-white"
                    aria-label="cart"
                  >
                    <i class="fa-solid fa-cart-shopping"></i>
                  </Link>
                  {/* <span className="ms-3 cursor-pointer"><i class="fa-regular">My profile</i></span> */}
                  <Link
                    to="/userprofile"
                    className="cursor-pointer d-flex align-items-center text-white"
                    aria-label="userprofile"
                  >
                    <i class="fa-regular fa-user"></i>
                  </Link>

                  {isAdmin == "admin" ? (
                    <Link
                    aria-label="admin"
                    to="/admin"
                      className="cursor-pointer d-flex align-items-center text-white"
                    >
                      <i class="fa-solid fa-user-tie"></i>
                    </Link>
                  ) : null}

                  <span
                    onClick={() => signout()}
                    className="ms-3 cursor-pointer mt-1"
                  >
                    Sign out <i className="fa-solid fa-arrow-right ms-1"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
