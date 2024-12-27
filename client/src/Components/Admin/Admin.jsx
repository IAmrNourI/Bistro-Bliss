import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import userpic from "../../assets/userpic.jpg";
import { Link } from 'react-router-dom';

export default function Admin() {

return (

    <>
        <section className='Admin'>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2 ps-0"> 
                        <div className="admin-panal bg-dark-subtle p-3 vh-100">
                            <div className="details d-flex br">
                            <img width="70px" className="rounded-circle" src={userpic} alt="userpic"/>
                                <div className='d-flex flex-column ms-3'>
                                    <span className='text-secondary mt-1'>Welcome</span>
                                    <span className='mt-2 fw-500 '>Amr Nour</span>
                                </div>
                            </div>

                            <div className="side-nav mt-3">
                                <ul className='p-0'>
                                    <li> <Link to="menu" className=''>Menu</Link></li>
                                    <li>Contact</li>
                                    <li>Booking</li>
                                    <li>Users</li>
                                </ul>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>

)


}
