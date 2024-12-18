import React from 'react'
import fcustomer from '../../assets/customer.png'

export default function Feedback() {



return (


    <>
        <section className='feedback p-y'>
            <div className="container">
            <div class="section-header text-center pb-4"><h3 class="h1">What Our Customers Say</h3></div>
                <div className="row mt-4">
                    <div className="col-lg-4 col-md-6 mb-3">
                        <div className="feedback-item">
                            <p className='header'>“The best restaurant”</p>
                            <p className='info'>Last night, we dined at place and were simply blown away. 
                                From the moment we stepped in, 
                                we were enveloped in an inviting atmosphere 
                                and greeted with warm smiles
                            .</p>
                            <div className="customer d-flex mt-4">
                                <img src={fcustomer} alt="customer pic" />
                                <div className='ms-3 mt-2'>
                                    <p className='mb-1 fw-500'>Sophire Robson</p>
                                    <span>Los Angeles, CA</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-3">
                        <div className="feedback-item">
                            <p className='header'>“The best restaurant”</p>
                            <p className='info'>Last night, we dined at place and were simply blown away. 
                                From the moment we stepped in, 
                                we were enveloped in an inviting atmosphere 
                                and greeted with warm smiles
                            .</p>
                            <div className="customer d-flex mt-4">
                                <img src={fcustomer} alt="customer pic" />
                                <div className='ms-3 mt-2'>
                                    <p className='mb-1 fw-500'>Sophire Robson</p>
                                    <span>Los Angeles, CA</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 mb-3">
                        <div className="feedback-item">
                            <p className='header'>“The best restaurant”</p>
                            <p className='info'>Last night, we dined at place and were simply blown away. 
                                From the moment we stepped in, 
                                we were enveloped in an inviting atmosphere 
                                and greeted with warm smiles
                            .</p>
                            <div className="customer d-flex mt-4">
                                <img src={fcustomer} alt="customer pic" />
                                <div className='ms-3 mt-2'>
                                    <p className='mb-1 fw-500'>Sophire Robson</p>
                                    <span>Los Angeles, CA</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </>


)
}
