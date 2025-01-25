import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { resetPassword } from "../../network/user.api"; 
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

export default function NewPassword() {
let navigate = useNavigate();
const [isLoding, setIsLoding] = useState(false); 
const [inputValue, setInputValue] = useState("");
const [confirm, setConfirm] = useState("");

async function handleResetPassword(values) {
setIsLoding(true); 
const result = await resetPassword(values)
    .then((res) => {
    console.log(res);
    toast.success(res.data.message)
    navigate("/auth/login");
    setIsLoding(false); 
    })
    .catch((res) => {
    setIsLoding(false); 
    console.log(res);
    toast.success(res.data.message)
    });
}

const validationSchema = Yup.object().shape({
password: Yup.string()
    .matches(
    /^[A-Za-z0-9]{8,10}$/,
    "8-10 letters or numbers only"
    )
    .required("Password is required"),
confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required("Confirm password is required"),
});

let formik = useFormik({
initialValues: {
    password: "",
    confirmPassword: "",
},
validationSchema,
onSubmit: handleResetPassword,
});

return (
<>
    <section className="login-email">
    <div className="bg-register">
        <section className="register">
        <form onSubmit={formik.handleSubmit}>
            <div className="register-container">
            <div className="form-floating mb-3">
                <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="password"
                value={formik.values.password}
                type="password"
                id="password"
                className="form-control"
                placeholder="New Password"
                />
                <label htmlFor="password">New Password</label>
                {formik.errors.password && formik.touched.password ? (
                <span className="alert alert-danger p-0 mt-1 d-block">
                    {formik.errors.password}
                </span>
                ) : null}
            </div>

            <div className="form-floating mb-3">
                <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="confirmPassword"
                value={formik.values.confirmPassword}
                type="password"
                id="confirmPassword"
                className="form-control"
                placeholder="Confirm Password"
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
                {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                <span className="alert alert-danger p-0 mt-1 d-block">
                    {formik.errors.confirmPassword}
                </span>
                ) : null}
            </div>

            <button
                type="submit"
                className="btn btn-register w-100"
                disabled={isLoding}
            >
                {isLoding ? (
                <i className="fas fa-spinner fa-spin"></i>
                ) : (
                "Submit"
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
