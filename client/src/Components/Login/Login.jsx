import React, { useContext, useState, useEffect } from "react";
import { email } from "../../network/user.api";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import toast from "react-hot-toast";



export default function Login() {
  let { userId, setuserId } = useContext(UserContext);
  const [isLoding, setisLoding] = useState(false)
  const navigate = useNavigate();
  const [inputValue, setinputValue] = useState("");

  
  async function verifyEmail() {

    setisLoding(true)
    const result = await email({ email: inputValue })
    
    .then((res) => {
      // console.log(result.data.data._id)
      setuserId(res.data.data._id) // >> use params
      localStorage.setItem("userId", res.data.data._id)
      navigate("/auth/loginpassword");
      setisLoding(false);
      })
      .catch((res) => {
      setisLoding(true)
      toast.error(res.response.data.message)
      console.log(res)
      setisLoding(false)
      if(res.response.data.message == "Pleaser verify your account first"){
        navigate("/auth/otp", { state: { email: inputValue } });
      }
      });
  }

  return (
    <>
      <section className="login-email">
        <div className="bg-register">
          <section className="register">
            <form action="">
              <div className="register-container">
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    value={inputValue}
                    onChange={(e) => setinputValue(e.target.value)}
                    placeholder="Enter email adress"
                    className="form-control"
                  />
                  <label htmlFor="floatingInput">Enter Email</label>
                </div>
                <button
                  type="button"
                  onClick={verifyEmail}
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
