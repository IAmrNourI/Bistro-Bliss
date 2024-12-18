import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { register } from "../../network/user.api";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

export default function Register() {
  const navigate = useNavigate();
  const [btnLoding, setbtnLoding] = useState(false)

  async function handleRegister(values) {
    setbtnLoding(true)
    const result = await register(values)
      .then((res) => {
        navigate("/auth/otp", { state: { email: values.email } });
        setbtnLoding(false)
      })
      .catch((res) => {
        setbtnLoding(true)
        toast.error(res.response.data.message)
        setbtnLoding(false)
      });
    // console.log(result);
    // let res = await axios.post(`http://localhost:8085/api/register`, values);
    // console.log(res);
  }

  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Please enter at least 3 characters")
      .max(10, "Maximum 10 characters allowed")
      .required("Name is required"),
    email: Yup.string().email("invalid email").required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Za-z0-9]{6,10}$/,
        "6-10 letters or numbers only"
      )
      .required("Password is required"),
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
              <div className="form-floating mb-3">
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
                <label htmlFor="floatingInput">Enter your name</label>
                {formik.errors.name ? (
                  <span className="alert alert-danger p-0 mt-1 d-block">
                    {formik.errors.name}
                  </span>
                ) : null}
              </div>

              <div className="form-floating mb-3">
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
                <label htmlFor="floatingInput">Email address</label>
                {formik.errors.email ? (
                  <span className="alert alert-danger p-0 mt-1 d-block">
                    {formik.errors.email}
                  </span>
                ) : null}
              </div>

              <div className="form-floating mb-3">
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
                <label htmlFor="floatingInput">Password</label>
                {formik.errors.password ? (
                  <span className="alert alert-danger p-0 mt-1 d-block">
                    {formik.errors.password}
                  </span>
                ) : null}
              </div>

              <button type="submit" className="btn btn-register w-100">
                {btnLoding ? <i className='fas fa-spinner fa-spin'></i> : "Register" }  
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
