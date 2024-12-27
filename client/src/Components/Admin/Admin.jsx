import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import userpic from "../../assets/userpic.jpg";

export default function Admin() {

return (

    <>
        <section className='Admin'>
            <div className="row">
                <div className="col-3"> 
                    <div className="admin-panal bg-dark-subtle p-3 vh-100">
                        <div className="logo d-flex align-items-center">
                            {/* <img src={logo} width="40px" alt="logo" />
                            <h4 className='ms-2 mt-2'>Bistro Bliss</h4> */}
                        </div>
                        <div className="details d-flex">
                        <img width="70px" className="rounded-circle" src={userpic} alt="userpic"/>
                            <div className='d-flex flex-column ms-3'>
                                <span className='text-secondary mt-1'>Welcome</span>
                                <span className='mt-2 fw-500'>fathy_abdelhamind</span>
                            </div>
                        </div>

                        <div className="side-nav">
                            <ul>
                                <li>Munu</li>
                                <li>Contact</li>
                                <li>Booking</li>
                                <li>Users</li>
                            </ul>
                            
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>

)


}
