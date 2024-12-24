import React from 'react'

export default function Contact() {

return (

    <>
        <section className='contact p-y'>
                <div className="section-header text-center pb-4 mb-5">
                    <h3 className="fs-menu">Contact Us</h3>
                    <p className="m-auto">We consider all the drivers of change gives you the components{" "}
                    <br /> you need to change to create a truly happens.
                    </p>
                </div>
            <div className="container-contact">
                <div className='bg-white p-2 drop-shadow'>
                <div className="row d-flex justify-content-center mt-4">
                    <div className="test col-lg-5 rounded-start-3">
                        <label className='mb-1' htmlFor="">Name</label>
                        <input className='w-100 input-style' type="text" placeholder='Enter your name ' />
                    </div>
                    <div className="test col-lg-5 rounded-top-2">
                        <label className='mb-1' htmlFor="">Email</label>
                        <input className='w-100 input-style' type="text" placeholder='Enter email address' />
                    </div>
                </div>
                <div className="row d-flex flex-column align-items-center justify-content-center">
                    <div className="col-lg-10 mt-3">
                        <label className='mb-1' htmlFor="">Subject</label>
                        <input className='w-100 input-style' type="text" placeholder='Write a subject' />
                    </div>
                    <div className="col-lg-10 mt-3">
                        <label className='mb-1' htmlFor="">Message</label>
                        <textarea className='w-100 input-style rounded-4 mb-3' rows="5" type="text" placeholder='Write your message' name="" id=""></textarea>
                        <button className='w-100 mb-4 btn-contact'>Send</button>
                    </div>
                </div>
                </div>


            </div>
        </section>
    </>

)

}
