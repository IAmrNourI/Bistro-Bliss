import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import userpic from "../../assets/userpic.jpg";
import { Link } from 'react-router-dom';
import AdminPanal from '../Sidebar/AdminPanal';


export default function Admin() {

return (

    <>
            <div className="positon-fixed">
                <div className="container-fluid ">
                    <div className="row">
                        <AdminPanal />
                    </div>
                </div>
            </div>
    </>

)


}
