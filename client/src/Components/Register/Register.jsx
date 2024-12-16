import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { register } from "../../network/user.api";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  async function handleRegister(values) {
    const result = await register(values)
      .then((res) => {
        navigate("/auth/otp", { state: { email: values.email } });
      })
      .catch((res) => {
        console.log(res.response.data.message);
      });
    // console.log(result);
    // let res = await axios.post(`http://localhost:8085/api/register`, values);
    // console.log(res);
  }

  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "min lenght is 3")
      .max(10, "max length is 10")
      .required("name is required"),
    email: Yup.string().email("invalid email").required("email is required"),
    password: Yup.string()
      .matches(
        /^[A-Za-z0-9]{6,10}$/,
        "password should be between 6 and 10 char-num"
      )
      .required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <>
      <div className="bg-register">
        <section className="register">
        <form onSubmit={formik.handleSubmit} action="">
          <div className="register-container">
              <div class="form-floating mb-3">
                <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="name"
                value={formik.values.name}
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter your name"
                />
                <label for="floatingInput">Enter your name</label>
              </div>

              <div class="form-floating mb-3">
                <input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  name="email"
                  value={formik.values.email}
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter email adress"
                />
                <label for="floatingInput">Email address</label>
              </div>
              
              <div class="form-floating mb-3">
                <input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  name="password"
                  value={formik.values.password}
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder=""
                />
                <label for="floatingInput">Password</label>
              </div>

            <button type="submit" class="btn btn-register w-100">
              Register
            </button>
            
          </div>
        </form>
      </section>
    </div>
    </>
  );
}
