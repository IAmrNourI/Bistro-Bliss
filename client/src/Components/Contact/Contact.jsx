import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { createContact, viewContact } from "../../network/user.api";
import * as Yup from "yup";
import toast from 'react-hot-toast';
import { useLocation } from "react-router-dom";




export default function Contact() {
    const { pathname } = useLocation();
    const [btnLoding, setbtnLoding] = useState(false)  

    async function sendContact(values) {
        setbtnLoding(true)
        const result = await createContact(values)
        
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

    useEffect(() => {
        window.scrollTo(0,0)
    }, [pathname]);

    let validationSchema = Yup.object().shape({
    name: Yup.string()
    .min(3, "Please enter at least 3 characters")
    .max(10, "Maximum 10 characters allowed")
    .required("Name is required"),
    email: Yup.string().email("invalid email").required("Email is required"),
    subject: Yup.string()
    .min(5, "Please enter at least 5 characters")
    .max(20, "Maximum 20 characters allowed")
        .required("Subject is erquired"),
    message: Yup.string()
    .min(5, "Please enter at least 5 characters")
    .max(200, "Maximum 200 characters allowed")
        .required("Message is erquired"),
    });

    let formik = useFormik({
    initialValues: {
        name: "",
        email: "",
        subject: "",
        message: "",
    },
    validationSchema,
    onSubmit: sendContact,
});

return (

    <>
        <section className='contact p-y'>
                <div className="section-header text-center pb-4 mb-5">
                    <h3 className="fs-menu">Contact Us</h3>
                    <p className="m-auto">We consider all the drivers of change gives you the components{" "}
                    <br /> you need to change to create a truly happens.
                    </p>
                </div>

        <form onSubmit={formik.handleSubmit} action="">
            <div className="container-contact">
                <div className='bg-white p-2 drop-shadow'>
                <div className="row d-flex justify-content-center mt-4">
                    <div className="test col-lg-5 rounded-start-3">
                        <label className='mb-1 fw-500' htmlFor="name">Name</label>
                        <input 
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        name="name"
                        id="name"
                        className='w-100 input-style' 
                        type="text" 
                        placeholder='Enter your name ' />
                        {formik.errors.name ? (
                        <span className="alert alert-danger p-0 mt-1 d-block">
                            {formik.errors.name}
                        </span>
                        ) : null}
                    </div>
                    <div className="test col-lg-5 rounded-top-2">
                        <label className='mb-1 fw-500' htmlFor="email">Email</label>
                        <input 
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        name="email"
                        id="email"
                        className='w-100 input-style' 
                        type="email" 
                        placeholder='Enter email address' />
                        {formik.errors.email ? (
                        <span className="alert alert-danger p-0 mt-1 d-block">
                            {formik.errors.email}
                        </span>
                        ) : null}
                    </div>
                </div>
                <div className="row d-flex flex-column align-items-center justify-content-center">
                    <div className="col-lg-10 mt-3">
                        <label className='mb-1 fw-500' htmlFor="subject">Subject</label>
                        <input 
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.subject}
                        name="subject"
                        id="subject"
                        className='w-100 input-style' 
                        type="text" 
                        placeholder='Write a subject' />
                        {formik.errors.subject ? (
                        <span className="alert alert-danger p-0 mt-1 d-block">
                            {formik.errors.subject}
                        </span>
                        ) : null}
                    </div>
                    <div className="col-lg-10 mt-3">
                        <label className='mb-1 fw-500' htmlFor="message">Message</label>
                        <textarea 
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.message}
                        className='w-100 input-style rounded-4' 
                        rows="5" 
                        type="text" 
                        placeholder='Write your message' 
                        name="message" 
                        id="message">
                        </textarea>
                        {formik.errors.message ? (
                        <span className="alert alert-danger p-0 mt-1 d-block">
                        {formik.errors.message}
                        </span>
                        ) : null}
                        
                        <button type="submit" className='w-100 mb-4 btn-contact mt-3'>
                            {btnLoding ? <i className='fas fa-spinner fa-spin'></i> : "Send" }  
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
