import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { createBook, getBooking } from "../../network/user.api";
import * as Yup from "yup";
import toast from 'react-hot-toast';


export default function Book() {
    const [btnLoding, setbtnLoding] = useState(false)

    async function bookTable(values) {
        setbtnLoding(true)
        const result = await createBook(values)
        
        .then((res) => {
            console.log(res)
            toast.success(res.data.message)
            setbtnLoding(false)
        })
        .catch((res) => {
            setbtnLoding(true)
            console.log(res);
            toast.error(res.response.data.message)
            setbtnLoding(false)
        });
    }


    async function showBooking(){
        console.log("hello");
        
        setbtnLoding(true)
        const result = await getBooking()
        
        .then((res) => {
            console.log(res)
            toast.success(res.data.message)
            setbtnLoding(false)
        })
        .catch((res) => {
            setbtnLoding(true)
            console.log(res);
            toast.error(res.response.data.message)
            setbtnLoding(false)
        });
    }


    // let validationSchema = Yup.object().shape({
    // name: Yup.string()
    // .min(3, "Please enter at least 3 characters")
    // .max(10, "Maximum 10 characters allowed")
    // .required("Name is required"),
    // email: Yup.string().email("invalid email").required("Email is required"),
    // subject: Yup.string()
    // .min(5, "Please enter at least 5 characters")
    // .max(20, "Maximum 20 characters allowed")
    //     .required("Subject is erquired"),
    // message: Yup.string()
    // .min(5, "Please enter at least 5 characters")
    // .max(200, "Maximum 200 characters allowed")
    //     .required("Message is erquired"),
    // });

    let formik = useFormik({
    initialValues: {
        date_time: "",
        time: "",
        name: "",
        phone: "",
        person: "",
    },
    // validationSchema,
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
                        value={formik.values.person}
                        name="person"
                        id="person"
                        className='w-100 input-style form-select py-3' 
                        type="text" 
                        > 
                        <option value="1">1 Person</option>
                        <option value="2">2 Person</option>
                        <option value="3">3 Person</option>
                        <option value="4">4 Person</option>
                    </select>
                        {formik.errors.subject ? (
                        <span className="alert alert-danger p-0 mt-1 d-block">
                            {formik.errors.subject}
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
