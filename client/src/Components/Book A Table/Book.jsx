import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { createBook, getBooking } from "../../network/user.api";
import * as Yup from "yup";
import toast from 'react-hot-toast';


export default function Book() {
    const [btnLoding, setbtnLoding] = useState(false)

    async function bookTable(values) {
        console.log(values)
        //"2025-01-25T10:12:50.500Z"
        const dataTime = `${values.date_time}T${values.time}`
        const newValues = {
            ...values,
            date_time: dataTime,
        };
        console.log(newValues)
        setbtnLoding(true)
        const result = await createBook(newValues)
        
        .then((res) => {
            console.log(res)
            toast.success(res.data.message)
            setbtnLoding(false)
        })
        .catch((res) => {
            setbtnLoding(true)
            console.log(res);
            toast.error(res.response.data.errors[0].msg)
            setbtnLoding(false)
        });
    }


    let validationSchema = Yup.object().shape({
    name: Yup.string()
    .min(3, "Please enter at least 3 characters")
    .max(15, "Maximum 10 characters allowed")
    .required("Name is required"),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "invalid phone number")
    .required("phone is erquired"),
    date_time: Yup.string()
    .required("Date is required"), 
    time: Yup.string()
    .required("Time is required"),
    totalPerson: Yup.string()
    .required("Total person is required"),
    });

    let formik = useFormik({
    initialValues: {
        date_time: "",
        name: "",
        phone: "",
        totalPerson: "",
    },
    validationSchema,
    onSubmit: bookTable,
});

return (

    <>
        <section className='book p-y position-relative'>
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2412.9394197035094!2d-108.2994708!3d52.7874005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg!4v1735151992713!5m2!1sen!2seg" 
            class="iframe position-absolute"
            frameborder="0" 
            allowfullscreen>
        </iframe>
                <div className="section-header text-center pb-4 mb-5">
                    <h3 className="fs-menu">Book A Table</h3>
                    <p className="m-auto">We consider all the drivers of change gives you the components{" "}
                    <br /> you need to change to create a truly happens.
                    </p>
                </div>

        <form onSubmit={formik.handleSubmit} action="">
            <div className="container-contact">
                <div className='bg-white p-2 drop-shadow'>
                <div className="row d-flex justify-content-center mt-4">
                    <div className="col-lg-5 rounded-start-3">
                        <label className='mb-1 fw-500' htmlFor="date">Date</label>
                        <input 
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.date_time}
                        name="date_time"
                        id="date"
                        className='w-100 input-style' 
                        type="date" 
                        />
                        {formik.errors.date_time ? (
                        <span className="alert alert-danger p-0 mt-1 d-block">
                            {formik.errors.date_time}
                        </span>
                        ) : null}
                    </div>
                    <div className="col-lg-5 rounded-top-2">
                        <label className='mb-1 fw-500' htmlFor="time">Time</label>
                        <input 
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.time}
                        name="time"
                        id="time"
                        className='w-100 input-style' 
                        type="time" 
                        />
                        {formik.errors.time ? (
                        <span className="alert alert-danger p-0 mt-1 d-block">
                            {formik.errors.time}
                        </span>
                        ) : null}
                    </div>
                    <div className="col-lg-5 rounded-top-2 mt-4">
                        <label className='mb-1 fw-500' htmlFor="name">Name</label>
                        <input 
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        name="name"
                        id="name"
                        className='w-100 input-style' 
                        type="name" 
                        placeholder='Enter your name ' />
                        {formik.errors.name ? (
                        <span className="alert alert-danger p-0 mt-1 d-block">
                            {formik.errors.name}
                        </span>
                        ) : null}
                    </div>
                    <div className="col-lg-5 rounded-top-2 mt-4">
                        <label className='mb-1 fw-500' htmlFor="phone">Phone</label>
                        <input 
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        name="phone"
                        id="phone"
                        className='w-100 input-style' 
                        type="text" 
                        placeholder='x-xxx-xxx-xxxx' />
                        {formik.errors.phone ? (
                        <span className="alert alert-danger p-0 mt-1 d-block">
                            {formik.errors.phone}
                        </span>
                        ) : null}
                    </div>
                </div>
                <div className="row d-flex flex-column align-items-center justify-content-center">
                    <div className="col-lg-10 mt-4">
                        <label className='mb-1 fw-500' htmlFor="person">Total Person</label>
                    <select
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.totalPerson}
                        name="totalPerson"
                        id="totalPerson"
                        className='w-100 input-style form-select py-3' 
                        type="number" 
                        
                        > 
                        <option value="" disabled>
                        Total Person
                        </option>
                        <option value="1">1 Person</option>
                        <option value="2">2 Person</option>
                        <option value="3">3 Person</option>
                        <option value="4">4 Person</option>
                        <option value="5">5 Person</option>
                        <option value="6">6 Person</option>
                        <option value="7">7 Person</option>
                        <option value="8">8 Person</option>
                        <option value="9">9 Person</option>
                        <option value="10">10 Person</option>
                    </select>
                        {formik.errors.totalPerson ? (
                        <span className="alert alert-danger p-0 mt-1 d-block">
                            {formik.errors.totalPerson}
                        </span>
                        ) : null}
                    </div>
                    <div className="col-lg-10 mt-3">
                        <button type="submit" className='w-100 mb-4 btn-contact mt-3'>
                            {btnLoding ? <i className='fas fa-spinner fa-spin'></i> : "Book A Table" }  
                        </button>
                    </div>
                </div>
                </div>
                    

            </div>
        </form>

        </section>
    </>

)

}
