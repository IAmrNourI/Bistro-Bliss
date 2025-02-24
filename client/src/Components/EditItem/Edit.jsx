import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { editItem } from "../../network/user.api";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";


export default function Edit() {
const [btnLoding, setbtnLoding] = useState(false);

const location = useLocation()
const { id,name,price,desc,category } = location.state || {};




async function edit(values) {    
    // console.log(values);
    
    setbtnLoding(true);
    const result = await editItem(values)

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
    .max(100, "Maximum 100 characters allowed")
    .required("Name is required"),
});

let formik = useFormik({
initialValues: {
    id,
    name: name || "",
    price: price || "",
    category: category || "",
    description: desc || "",
},
validationSchema,
onSubmit: edit,
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
                <span className="alert text-start text-danger mb-0 p-0 d-block">
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
                <span className="alert text-start text-danger mb-0 p-0 d-block">
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
                <span className="alert text-start text-danger mb-0 p-0 d-block">
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
                <span className="alert text-start text-danger mb-0 p-0 d-block">
                {formik.errors.description}
                </span>
            ) : null}
            </div>

            <button type="submit" className="btn btn-register w-100">
            {btnLoding ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                "Edit Item"
            )}
            </button>
        </div>
        </form>
    </section>
    </div>
</>
);
}
