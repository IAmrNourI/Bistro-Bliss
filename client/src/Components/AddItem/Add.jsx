import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { addItem } from "../../network/user.api";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Add() {
    const navigate = useNavigate();
    const [btnLoding, setbtnLoding] = useState(false);
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
                formik.setFieldValue("image", uploadedPath); // تحديث قيمة الصورة في فورميك
                toast.success("Image uploaded successfully!");
            } else {
                toast.error("Failed to upload image.");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("An error occurred during the upload.");
        }
    }

    async function addToMenu(values) {
        if (!values.image) {
            toast.error("Please upload an image first!");
            return;
        }

        setbtnLoding(true);
        try {
            const res = await addItem(values);
            toast.success(res.data.message);
            // navigate("/menu");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add item.");
        }
        setbtnLoding(false);
    }

    let validationSchema = Yup.object().shape({
        image: Yup.string().required("Image is required"),
        name: Yup.string()
            .min(3, "Please enter at least 3 characters")
            .max(20, "Maximum 20 characters allowed")
            .required("Name is required"),
        price: Yup.number()
            .min(1, "Price must be at least 1")
            .max(999, "Price must be less than 1000")
            .required("Price is required"),
        category: Yup.string()
            .required("You must select a category")
            .notOneOf([""], "You must select a category"),
        description: Yup.string()
            .min(5, "Please enter at least 5 characters")
            .max(60, "Maximum 60 characters allowed")
            .required("Description is required"),
    });

    let formik = useFormik({
        initialValues: {
            image: "",
            name: "",
            price: "",
            category: "",
            description: "",
        },
        validationSchema,
        onSubmit: addToMenu,
    });

    return (
        <div className="bg-register">
            <section className="register">
                <form onSubmit={formik.handleSubmit}>
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
                                className="form-control"
                                placeholder="Name"
                            />
                            <label>Name</label>
                            {formik.errors.name && (
                                <span className="text-danger">{formik.errors.name}</span>
                            )}
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                name="price"
                                value={formik.values.price}
                                type="number"
                                className="form-control"
                                placeholder="Price"
                            />
                            <label>Price</label>
                            {formik.errors.price && (
                                <span className="text-danger">{formik.errors.price}</span>
                            )}
                        </div>

                        <div className="form-floating mb-3">
                            <select
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                name="category"
                                value={formik.values.category}
                                className="form-select"
                            >
                                <option value="" disabled>
                                    Select a category
                                </option>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Main Dishes">Main Dishes</option>
                                <option value="Drinks">Drinks</option>
                                <option value="Desserts">Desserts</option>
                            </select>
                            <label>Category</label>
                            {formik.errors.category && (
                                <span className="text-danger">{formik.errors.category}</span>
                            )}
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                name="description"
                                value={formik.values.description}
                                type="text"
                                className="form-control"
                                placeholder="Description"
                            />
                            <label>Description</label>
                            {formik.errors.description && (
                                <span className="text-danger">{formik.errors.description}</span>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-register w-100"
                            disabled={!imagePath || btnLoding} // منع الإضافة بدون صورة
                        >
                            {btnLoding ? <i className="fas fa-spinner fa-spin"></i> : "Add Item"}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}
