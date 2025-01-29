import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { getNotifications, getUser, logOut } from "../../network/user.api";
import toast from "react-hot-toast";

export default function Topbar() {
  let navigate = useNavigate()
  const [user, setuser] = useState([]);
  const [getNotification, setgetNotification] = useState([])
  let { userLogin, setuserLogin } = useContext(UserContext);


  async function getUserNotification(){
    const result = await getNotifications()
    .then((res) => {
        console.log(res)
        getUserDate()
        setgetNotification(res.data.data)
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
            <div className="col-md-8">
              <div className="d-flex align-items-center">
                <i className="fa-solid fa-phone mx-2"></i>
                <p className="p-e">(414) 857 - 0107</p>
                <i className="fa-regular fa-envelope mx-2"></i>
                <p className="p-e">bisto_bliss@bistrobliss</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="social d-flex mt-2 pb-2">
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
              <a className="position-relative ms-3" onClick={getUserNotification} href="#">
                <span className="notificationsNumber">{user?.unSeenMessages}</span>
                <div className="notfication-container position-absolute p-2">
                    <span className="text-white p-2 d-inline-block h6">Notification</span>

                    {getNotification.map((messsage) => {
                            return (
                              <div className="message bg-white mt-3 p-1 text-black">
                                <h6 className="m-0 fw-bold px-2 pb-1">Message</h6>
                                <p className="px-2 m-0">{messsage.content}</p>
                              </div>
                            );
                        })}
                </div>
                <i className="fa-regular fa-bell text-white border-1 border border-secondary"></i>
              </a>
              {/* <span className="ms-3 cursor-pointer"><i class="fa-regular">My profile</i></span> */}
              <Link to="/userprofile" className="cursor-pointer d-flex align-items-center text-white border-1 border rounded-0 border-secondary"><i class="fa-regular fa-user"></i></Link>
              <span onClick={() => signout()} className="ms-3 cursor-pointer mt-1">Sign out <i className="fa-solid fa-arrow-right ms-1"></i></span>
            </div>
              </div>
          </div>

        </div>
      </section>) :null}
    </>
  );
}
