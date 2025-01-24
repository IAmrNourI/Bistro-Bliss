import React, { useContext, useState, useEffect } from "react";
import { email } from "../../network/user.api";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import toast from "react-hot-toast";

export default function ForgetPassword() {
    let { userId, setuserId } = useContext(UserContext);
    const [isLoding, setisLoding] = useState(false)
    const navigate = useNavigate();
    const [inputValue, setinputValue] = useState("");
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
