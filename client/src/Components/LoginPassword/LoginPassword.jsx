import React, { useContext, useState } from "react";
import { password } from "../../network/user.api";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

export default function LoginPassword() {
  let navigate = useNavigate();
  let { userLogin, setuserLogin } = useContext(UserContext);
  let { userId } = useContext(UserContext);
  const [inputValue, setinputValue] = useState("");

  async function verifyPassword() {
    console.log(userId);
    console.log(inputValue);

    const result = await password({ userId, password: inputValue });
    console.log(result);

    if (result.data.success) {
      setuserLogin(result.data.token);
      localStorage.setItem("userToken", result.data.token);

      // toast >> login succ
      navigate("/");
    } else {
      console.log("invalid pass");
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
                    type="password"
                    value={inputValue}
                    onChange={(e) => setinputValue(e.target.value)}
                    placeholder="Enter the password"
                    className="form-control"
                  />
                  <label for="floatingInput">Enter Password</label>
                </div>
                <button
                  type="button"
                  onClick={verifyPassword}
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
