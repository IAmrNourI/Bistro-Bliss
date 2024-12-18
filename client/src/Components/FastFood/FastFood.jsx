import React from 'react'
import fone from '../../assets/f-fimg.avif'
import ftow from '../../assets/f-simg.avif'
import fthree from '../../assets/f-timg.avif'


export default function FastFood() {




return (

    <>
        <section className='fast-food'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-12">
                        <div className='d-flex'>
                            <img src={fone} className='fimg object-fit-cover me-4' width="430px" height="500px" alt="" />
                            <div className='d-flex flex-column'>
                                <img src={ftow} className='simg object-fit-cover mt-4' width="260px" height="270px" alt="" />
                                <img src={fthree} className='timg object-fit-cover mt-4' width="260px" height="220px" alt="" />
                            </div> 
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 d-flex flex-column justify-content-center">
                        <div className="fast-item mt-2">
                            <h1>Fastest Food Delivery in City</h1>
                            <p className='fast-disc'>Our visual designer lets you quickly and of drag a down your way to 
                                customapps for both keep desktop. 
                            </p>
                            <ul class="p-0 fast-list">
                                <li><span><i class="fa-regular fa-clock"></i></span><p>Delivery within 30 minutes</p></li>
                                <li><span><i class="fa-regular fa-clock"></i></span><p>Best Offer & Prices</p></li>
                                <li><span><i class="fa-regular fa-clock"></i></span><p>Online Services Available</p></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
)
}
