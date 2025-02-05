import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { getNotifications, getUser, logOut } from "../../network/user.api";
import toast from "react-hot-toast";

export default function Topbar() {
  let navigate = useNavigate()
  const [user, setuser] = useState([]);
  const [getNotification, setgetNotification] = useState([])
  const [showNotification, setshowNotification] = useState(false)
  let { userLogin, setuserLogin } = useContext(UserContext);


  async function getUserNotification(){
    const result = await getNotifications()
    .then((res) => {
      setshowNotification(true)
        // console.log(res)
        // getUserDate()
        const notificationTime = res.data.data.map((time) => {
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
          
        setgetNotification(notificationTime)
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
          console.log(res);
          })
          .catch((res) => {
          console.log(res);
          });
      }

  async function signout(){
    const result = await logOut()
    .then((res) => {
        console.log(res)
        localStorage.removeItem("userToken");
        setuserLogin(null)
        navigate("/auth/login")
        toast.success(res.data.message)
      })
      .catch((res) => {
        console.log(res);
      });
      // navigate("/auth/login")
      // localStorage.removeItem("userToken");
  }


  useEffect(() => {
    getUserDate()
  }, []);

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
            <div className="col-xl-6">
              <div className="social d-flex mt-2 pb-2 d-flex justify-content-end">
              <a href="#">
                <i className="fa-brands fa-twitter text-white border-1 border border-secondary"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-facebook-f text-white border-1 border border-secondary"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-instagram text-white border-1 border border-secondary"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-github text-white border-1 border border-secondary"></i>
              </a>
              <a className="position-relative ms-3" 
              onClick={() => {if(!showNotification) getUserNotification(); setshowNotification(prev => !prev)}} href="#">
                <span className="notificationsNumber">{user?.unSeenMessages}</span>
                    {showNotification && (
                            <div className="notfication-container position-absolute p-3">
                              <h5 className="notfication-text text-black fw-bold">Notification</h5>
                              {[...getNotification].reverse().map((message) => {
                                      return (
                                        <div className="message bg-white text-black mt-2">
                                            <div className={message.unSeen ? "bg p-1 rounded-2": "p-1 rounded-2"}>
                                              <p className="px-2 m-0">{message.content}</p>
                                              <span className="px-2 text-secondary fw-500 d-block">{message.createdAt}</span>
                                            </div>
                                        </div>
                                      );
                                  })}
                          </div>
                    )}
                <i className="fa-regular fa-bell text-white border-1 border border-secondary"></i>
              </a>
              <Link to="/wishlist" className="cursor-pointer d-flex align-items-center text-white border-1 border rounded-0 border-secondary"><i class="fa-regular fa-heart"></i></Link>
              <Link to="/cart" className="cursor-pointer d-flex align-items-center text-white border-1 border rounded-0 border-secondary"><i class="fa-solid fa-cart-shopping"></i></Link>
              {/* <span className="ms-3 cursor-pointer"><i class="fa-regular">My profile</i></span> */}
              <Link to="/userprofile" className="cursor-pointer d-flex align-items-center text-white border-1 border rounded-0 border-secondary"><i class="fa-regular fa-user"></i></Link>
              <Link to="/admin" className="cursor-pointer d-flex align-items-center text-white border-1 border rounded-0 border-secondary"><i class="fa-solid fa-user-tie"></i></Link>
              <span onClick={() => signout()} className="ms-3 cursor-pointer mt-1">Sign out <i className="fa-solid fa-arrow-right ms-1"></i></span>
            </div>
              </div>
          </div>

        </div>
      </section>) :null}
    </>
  );
}
