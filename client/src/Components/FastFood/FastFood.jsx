import React from 'react'
import fone from '../../assets/f-fimg.avif'
import ftow from '../../assets/f-simg.avif'
import fthree from '../../assets/f-timg.avif'
import cheef from '../../assets/chef.png'
import meat from '../../assets/sour-curry.png'
import salad from '../../assets/iron-salad.png'

export default function FastFood() {




return (

    <>
        <section className='fast-food'>
            <div className="container">
                <div className="row">
                    <div className="col-xl-8 col-lg-12">
                        <div className='d-flex'>
                            <img loading="lazy" src={cheef} className='fimg object-fit-cover me-4 ' width="" height="550px" alt="Chef" />
                            <div className='d-flex flex-column fast-pic'>
                                <img loading="lazy" src={meat} className='simg object-fit-cover mt-4 ' width="250px" height="" alt="meat" />
                                <img loading="lazy" src={salad} className='timg object-fit-cover mt-4' width="250px" height="" alt="salad" />
                            </div> 
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-12 d-flex flex-column justify-content-center">
                        <div className="fast-item mt-5">
                            <h1>Fastest Food Delivery in City</h1>
                            <p className='fast-disc'>Our visual designer lets you quickly and of drag a down your way to 
                                customapps for both keep desktop. 
                            </p>
                            <ul class="p-0 fast-list">
                                <li><span><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g fill-opacity=".9"><path d="M255.8 48C141 48 48 141.2 48 256s93 208 207.8 208c115 0 208.2-93.2 208.2-208S370.8 48 255.8 48zm.2 374.4c-91.9 0-166.4-74.5-166.4-166.4S164.1 89.6 256 89.6 422.4 164.1 422.4 256 347.9 422.4 256 422.4z"></path><path d="M266.4 152h-31.2v124.8l109.2 65.5 15.6-25.6-93.6-55.5V152z"></path></g></svg></span><p>Delivery within 30 minutes</p></li>
                                <li><span><svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="m9 14.25 6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185ZM9.75 9h.008v.008H9.75V9Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008V13.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"></path></svg></span><p>Best Offer & Prices</p></li>
                                <li><span><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg></span><p>Online Services Available</p></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
)
}
