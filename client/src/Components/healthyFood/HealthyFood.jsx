import React from 'react'
import healthy from '../../assets/healthy.png'


export default function HealthyFood() {



return (

    <>
        <section className='healthy-food p-y '>
            <div className="container py-3">
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <div className="healthy-img">
                            <div className='position-relative'>
                                <img src={healthy} className='' width="500px" height="450px" alt="healthy food" />
                                <div className='bg-contact'>
                                    <p className='contact-header'>Come and visit us</p>
                                    <ul className='contact-ist p-0'>
                                        <li><i class="fa-solid fa-phone"></i><span href="#">(414) 857 - 0107</span></li>
                                        <li><i class="fa-regular fa-envelope"></i><span href="#">happytummy@restaurant.com</span></li>
                                        <li><i class="fa-solid fa-location-dot"></i><span>837 W. Marshall Lane Marshalltown, IA 50158, Los Angeles</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 d-flex flex-column align-items-center justify-content-center">
                        <div className="healthy-info ms-5 mt-5">
                            <h1>We provide healthy food for your family.</h1>
                            <p>Our story began with a vision to create a unique dining experience that merges fine dining, 
                                exceptional service, and a vibrant ambiance. Rooted in city's rich 
                                culinary culture, we aim to honor our local roots while infusing a global palate.
                            </p>
                            <p>At place, we believe that dining is not just about food, but also about the overall experience. Our staff, 
                                renowned for their warmth and dedication, strives to make every visit an unforgettable event.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
)



}
