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


    async function uploadImage() {
        const input = document.getElementById('image');
        if (input.files.length === 0) {
            alert('Please select an image.');
            return;
        } //validate
    
        const formData = new FormData();
        formData.append('image', input.files[0]); // Key must match the backend key ('image')
    
        try {
            const response = await axios.post('http://localhost:8085/api/menu/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Required for file uploads
                },
            });
    
            if (response.status === 200) {
                // alert('Image uploaded successfully: ' + JSON.stringify(response.data));
                console.log(response);
                console.log(response.data.path);
                console.log(response.data.normalizedPath);
                
                console.log('Image uploaded successfully: ' + JSON.stringify(response.data));
            } else {
                alert('Failed to upload image.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('An error occurred during the upload.');
        }
    }


async function addToMenu(values) {
    setbtnLoding(true);
    const result = await addItem(values)

    .then((res) => {
    console.log(res);
    toast.success(res.data.message);
    setbtnLoding(false);
    })
    .catch((res) => {
    setbtnLoding(true);
    console.log(res);
    toast.error(res.response.data.message);
    setbtnLoding(false);
    });
}

let validationSchema = Yup.object().shape({
    image: Yup.mixed().required("Image is required"), 

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
    .min(5, "Please enter at least 3 characters")
    .max(60, "Maximum 20 characters allowed")
    .required("Name is required"),
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
<>
    <div className="bg-register">
    <section className="register">
        <form onSubmit={formik.handleSubmit} action="">
        <div className="register-container">

            <div className="mb-3">
            <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="image"
                value={formik.values.image}
                type="file"
                accept="image/*"
                id="image"
                className="form-control"
            />
            {formik.errors.image ? (
                <span className="alert alert-danger p-0 mt-1 d-block">
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
                name="price"
                value={formik.values.price}
                type="number"
                id="price"
                className="form-control"
                placeholder="Price"
            />
            <label htmlFor="floatingInput">Price</label>
            {formik.errors.price ? (
                <span className="alert alert-danger p-0 mt-1 d-block">
                {formik.errors.price}
                </span>
            ) : null}
            </div>

            <div className="form-floating mb-3">
            <select
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="category"
                value={formik.values.category}
                id="category"
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
            <label htmlFor="category">Category</label>
            {formik.errors.category ? (
                <span className="alert alert-danger p-0 mt-1 d-block">
                {formik.errors.category}
                </span>
            ) : null}
            </div>

            <div className="form-floating mb-3">
            <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="description"
                value={formik.values.description}
                type="text"
                id="description"
                className="form-control"
                placeholder="description"
            />
            <label htmlFor="floatingInput">description</label>
            {formik.errors.description ? (
                <span className="alert alert-danger p-0 mt-1 d-block">
                {formik.errors.description}
                </span>
            ) : null}
            </div>

            <button type="submit" className="btn btn-register w-100">
            {btnLoding ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                "Add Item"
            )}
            </button>
        </div>
        </form>
    </section>
    </div>
    <button onClick={(() => uploadImage())} className="text-center btn btn-danger ms-5">test file</button>
</>
);
}
