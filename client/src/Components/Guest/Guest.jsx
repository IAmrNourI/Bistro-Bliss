import React from 'react'
import cook from '../../assets/cook.png'

export default function Guest() {


return (

    <>
        <section className='guest p-y'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <div className="guest-info">
                            <h1>A little information for our valuable guest</h1>
                            <p>At place, we believe that dining is not just about food, 
                                but also about the overall experience. Our staff, 
                                renowned for their warmth and dedication, strives to make every visit an 
                                unforgettable event.
                            </p>
                            <div className="facts text-center mt-5">
                                <div className="locations square mb-3 me-3">
                                    <h1>3</h1>
                                    <p>Locations</p>
                                </div>
                                <div className='founded square'>                                
                                    <h1>1995</h1>
                                    <p>founded</p>
                                </div>
                                <div className='staff square me-3'>                                
                                    <h1>65+</h1>
                                    <p>Staff Members</p>
                                </div>
                                <div className='founded square'>                                
                                    <h1>100%</h1>
                                    <p>Satisfied Customers</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="guest-img">
                            <img src={cook} loading='lazy' className='  object-fit-cover rounded-3 mt-2' height="550px" width="550px" alt="cooking" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
)


}
