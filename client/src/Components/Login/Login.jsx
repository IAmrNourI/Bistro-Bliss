import React, { useContext, useState } from "react";
import { email } from "../../network/user.api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  let { userId, setuserId } = useContext(UserContext);
  const navigate = useNavigate();
  const [inputValue, setinputValue] = useState("");

  async function verifyEmail() {
    // console.log(dataToSend);
    const result = await email({ email: inputValue });
    console.log(result);

    if (result.data.success) {
      // console.log(result.data.data._id);
      setuserId(result.data.data._id); // >> use params
      localStorage.setItem("userId", result.data.data._id);
      // toast >> user found succ
      navigate("/auth/loginpassword");
    } else {
      console.log("user not fount");
    }
  }

  return (
    <>
      <section className="login-email">
        <div className="bg-register">
          <section className="register">
            <form action="">
              <div className="register-container">
                <div class="form-floating mb-3">
                  <input
                    type="email"
                    value={inputValue}
                    onChange={(e) => setinputValue(e.target.value)}
                    placeholder="Enter email adress"
                    className="form-control"
                  />
                  <label for="floatingInput">Enter Email</label>
                </div>
                <button
                  type="button"
                  onClick={verifyEmail}
                  className="btn btn-register w-100"
                >
                  !Go
                </button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </>
  );
}
