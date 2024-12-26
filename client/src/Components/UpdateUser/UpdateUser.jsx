import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { updateUser } from "../../network/user.api";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";


export default function Edit() {
const navigate = useNavigate()
const [btnLoding, setbtnLoding] = useState(false);

const location = useLocation()
const { phoneNumber,name } = location.state || {};




async function update(values) {    
    // console.log(values);
    
    setbtnLoding(true);
    const result = await updateUser(values)

    .then((res) => {
    console.log(res);
    toast.success(res.data.message);
    setbtnLoding(false);
    navigate("/userprofile")
    })
    .catch((res) => {
    setbtnLoding(true);
    console.log(res);
    toast.error(res.data.message);
    setbtnLoding(false);
    });

// // console.log(result);
// let res = await axios.post(`http://localhost:8085/api/register`, values);
// console.log(res);
}

let validationSchema = Yup.object().shape({
    name: Yup.string()
    .min(3, "Please enter at least 3 characters")
    .max(20, "Maximum 20 characters allowed")
    .required("Name is required"),
    phoneNumber: Yup.string().matches(/^01[0125][0-9]{8}$/, "invalid phone number")
    .required("phone is erquired"),
});

let formik = useFormik({
initialValues: {
    name: name || "",
    phoneNumber: phoneNumber || "",
},
validationSchema,
onSubmit: update,
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
                placeholder="Name"
            />
            <label htmlFor="floatingInput">Name</label>
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
                name="phoneNumber"
                value={formik.values.phoneNumber}
                type="text"
                id="phoneNumber"
                className="form-control"
                placeholder=""
                />
                <label htmlFor="floatingInput">Phone</label>
                {formik.errors.phoneNumber ? (
                <span className="alert alert-danger p-0 mt-1 d-block">
                    {formik.errors.phoneNumber}
                </span>
                ) : null}
            </div>


            <button type="submit" className="btn btn-register w-100">
            {btnLoding ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                "Update Date"
            )}
            </button>
        </div>
        </form>
    </section>
    </div>
</>
);
}
