import React from "react";

export default function LoginPassword() {
  return (
    <>
      <section className="login-email">
        <form action="">
          <div className="d-flex justify-content-center align-items-center vh">
            <div className="style-auth d-flex flex-column my-4 p-3">
              <label htmlFor="">Password</label>
              <input type="password" placeholder="Enter the password" />
              <button className="btn-1">!Go</button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
