import React from 'react'
import axios from 'axios'
import { items } from '../../network/user.api';


export default function RecentMenu() {

    async function getAllMenu(){
        // let res = await axios.get("http://localhost:8080/api/menu/add-item")
        // console.log(res);

        const result = await items()
        console.log(result)
        .then((res) => {
        console.log(res);
            
        })
        .catch((res) => {
            console.log(res);
        });
        
    }


return (

    <>
        <section className='menu p-y'>
            <div className="container">
                <div className="section-header text-center pb-4">
                        <h3 className="fs-menu">Our Menu</h3>
                        <p className='m-auto'>We consider all the drivers of change gives you the components <br /> you need to change to 
                            create a truly happens.
                        </p>
                </div>
                <div className="row d-flex justify-content-center mt-4">
                    <div onClick={getAllMenu} className="col-lg-2 mb-3 btn-category">
                    <span>All</span>             
                    </div>
                    <div className="col-lg-2 mb-3 btn-category">
                    <span>Breakfast</span>             
                    </div>
                    <div className="col-lg-2 mb-3 btn-category">
                    <span>Main Dishes</span>             
                    </div>
                    <div className="col-lg-2 btn-category">
                    <span>Drinks</span>             
                    </div>
                    <div className="col-lg-2 btn-category">
                    <span>Desserts</span>             
                    </div>
                </div>

                <div className="row">
                    <div className="col-3">
                        <div className="menu-item text-center border border-1 rounded-4">
                            <img src="" alt="" />
                            <div className='p-3'>
                            <p>$ 9.99</p>
                            <p>Fried Eggs</p>
                            <p>Made with eggs, lettuce, salt, oil and other ingredients.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>

)



}
