import React, { useContext, useState, useEffect } from "react";
import { forgetPassword } from "../../network/user.api";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import toast from "react-hot-toast";

export default function ForgetPassword() {
  let { userId, setuserId } = useContext(UserContext);
  const [isLoding, setisLoding] = useState(false);
  const navigate = useNavigate();
  const [inputValue, setinputValue] = useState("");
  const [test, settest] = useState("second")

  async function resetPassword() {
    setisLoding(true);
    console.log(inputValue);
    settest(inputValue.slice(-2))

    const result = await forgetPassword({ email: inputValue,name: test })
      .then((res) => {
        localStorage.setItem("resetPassword", true);
        navigate("/auth/otp", { state: { email: inputValue } });
        console.log(res);
        setisLoding(false);
      })
      .catch((res) => {
        setisLoding(true);
        toast.error(res.response.data.message);
        console.log(res);
        setisLoding(false);
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
                  <label htmlFor="floatingInput">Confirm Email</label>
                </div>
                <button
                  onClick={resetPassword}
                  type="button"
                  className="btn btn-register w-100"
                >
                  {isLoding ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "!Search"
                  )}
                </button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </>
  );
}
