import axios from "axios";
import { useFormik } from "formik";
import React from "react";

export default function Register() {

  async function handleRegister(values){
    console.log(values);
    let res = await axios.post(`http://localhost:8085/api/register`, values)
    console.log(res);    
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit : handleRegister,
  });

  return (
    <>
      <section className="register">
        <form onSubmit={formik.handleSubmit} action="">
          <div className="center d-flex justify-content-center flex-wrap">
            <div className="d-flex flex-column">
              <label htmlFor="">Name</label>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="name"
                value={formik.values.name}
                type="text"
                id="name"
                placeholder="Enter your name"
              />
            </div>

            <div className="d-flex flex-column">
              <label htmlFor="">Email</label>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="email"
                value={formik.values.email}
                type="email"
                id="email"
                placeholder="Enter email adress"
              />
            </div>

            <div className="d-flex flex-column my-4">
              <label htmlFor="">Password</label>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="password"
                value={formik.values.password}
                type="password"
                id="password"
                placeholder="Enter the password"
              />
            </div>

            <button type="submit" className="btn-1 d-block">Register</button>
          </div>
        </form>
      </section>
    </>
  );
}
