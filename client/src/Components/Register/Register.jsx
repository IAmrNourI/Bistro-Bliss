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
        navigate("/auth/ottp", { state: { email: values.email } });
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

            <button type="submit" className="btn-1 d-block">
              Register
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
