import React, { useContext, useState } from "react";
import { password } from "../../network/user.api";
import { UserContext } from "../../Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { io } from "socket.io-client";


export default function LoginPassword() {
  let navigate = useNavigate();
  let { userLogin, setuserLogin } = useContext(UserContext);
  const [isLoding, setisLoding] = useState(false)
  let { userId } = useContext(UserContext);
  const [inputValue, setinputValue] = useState("");

  async function verifyPassword() {
    console.log(userId);
    // console.log(inputValue);
    setisLoding(true)
    const result = await password({ userId, password: inputValue })
    .then((res) => {
      // console.log(res);
      setuserLogin(res.data.token);
      localStorage.setItem("userToken", res.data.token);
      localStorage.setItem("notReloaded", true);
      // localStorage.setItem("userToken", true);
      navigate("/")
      setisLoding(false)
      toast.success("Welcome back")
      })
      .catch((res) => {
      setisLoding(true)
      toast.error(res.response.data.message)
      setisLoding(false)
      });
    
  }

  return (
    <>
      <section className="login-email">
        <div className="bg-register">
          <section className="register">
            <form onSubmit={(e) => {e.preventDefault(); verifyPassword()}} action="">
              <div className="register-container">
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    value={inputValue}
                    onChange={(e) => setinputValue(e.target.value)}
                    placeholder="Enter the password"
                    className="form-control"
                  />
                  <label htmlFor="floatingInput">Enter Password</label>
                </div>
                <button
                  type="button"
                  onClick={verifyPassword}
                  className="btn btn-register w-100"
                >
                  {isLoding ? <i className='fas fa-spinner fa-spin'></i> : "!Go"}
                  
                </button>
                <Link to="/auth/forgetpassword" className="d-flex justify-content-end mt-2">Forget Password</Link>
              </div>
            </form>
          </section>
        </div>
      </section>
    </>
  );
}
