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
  const [imagePath, setImagePath] = useState(""); // لحفظ مسار الصورة بعد الرفع


    
  async function uploadImage() {
    const input = document.getElementById("image");
    if (input.files.length === 0) {
      toast.error("Please select an image and upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", input.files[0]);

    try {
        const response = await axios.post(
            "http://localhost:8085/api/menu/upload",
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        if (response.status === 200) {
            const uploadedPath = response.data.path;
            setImagePath(uploadedPath); // حفظ المسار بعد الرفع
            formik.setFieldValue("profilePic", uploadedPath); // تحديث قيمة الصورة في فورميك
            toast.success("Image uploaded successfully!");
            // console.log(uploadedPath)
        } else {
            toast.error("Failed to upload image.");
        }
    } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("An error occurred during the upload.");
    }
}

  async function handleRegister(values) {
    setbtnLoding(true)
    const result = await register(values)
    // result.value = "user"
    
    .then((res) => {
        console.log(res)
        // localStorage.setItem("resetPassword", false);
        navigate("/auth/otp", { state: { email: values.email } });
        setbtnLoding(false)
      })
      .catch((res) => {
        setbtnLoding(true)
        console.log(res);
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
        /^[A-Za-z0-9]{8,10}$/,
        "8-10 letters or numbers only"
      )
      .required("Password is required"),
      phoneNumber: Yup.string().matches(/^01[0125][0-9]{8}$/, "invalid phone number")
      .required("phone is erquired"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      profilePic:""
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
            <div className="mb-3 d-flex position-relative pb-3">
                            <input
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                name="image"
                                type="file"
                                accept="image/*"
                                id="image"
                                className="form-control"
                            />
                            <button
                                type="button"
                                onClick={uploadImage}
                                className="upload-btn border px-2 ms-1 rounded-2"
                            >
                                Upload
                            </button>
                            {formik.errors.image ? (
                                <span className="alert text-start text-danger mb-0 p-0 d-block position-absolute upload-alert">
                                    {formik.errors.image}
                                </span>
                            ) : null}
              </div>

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
                  <span className="alert text-start text-danger mb-0 p-0 mt-1 d-block">
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
                  <span className="alert text-start text-danger mb-0 p-0 mt-1 d-block">
                    {formik.errors.email}
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
                  id="phone"
                  className="form-control"
                  placeholder=""
                />
                <label htmlFor="floatingInput">Phone</label>
                {formik.errors.phoneNumber ? (
                  <span className="alert text-start text-danger mb-0 p-0 mt-1 d-block">
                    {formik.errors.phoneNumber}
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
                  <span className="alert text-start text-danger mb-0 p-0 mt-1 d-block">
                    {formik.errors.password}
                  </span>
                ) : null}
              </div>

              <button
                  type="submit"
                  className="btn btn-register w-100"
                  disabled={!imagePath || btnLoding} // منع الإضافة بدون صورة
                  >
                  {btnLoding ? <i className="fas fa-spinner fa-spin"></i> : "Register"}
                </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
