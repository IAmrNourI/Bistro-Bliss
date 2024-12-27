import React, { useEffect, useState } from "react";
import { cancelRequest, getBooking, getUser } from "../../network/user.api";
import userpic from "../../assets/userpic.jpg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export default function UserProfile() {
const [user, setuser] = useState(null);
const [booking, setbooking] = useState([])
let navigate = useNavigate();

async function getUserDate() {
const result = await getUser()
    .then((res) => {
    console.log(res);
    setuser(res.data.data);
    })
    .catch((res) => {
    console.log(res);
    });
}

async function showBooking(){
    const result = await getBooking()
    .then((res) => {
        console.log(res)
        toast.success(res.data.message)
        setbooking(res.data.data)
    })
    .catch((res) => {
        console.log(res);
        toast.error(res.response.data.message)
    });
}

function updateData(name, phoneNumber){
    navigate("/updateuser", { state: {name, phoneNumber} });
}

async function cancelBooking(id){
    console.log(id);
    
    const result = await cancelRequest(id)
    .then((res) => {
        console.log(res)
        // toast.success(res.data.message)
        // setbooking(res.data.data)
    })
    .catch((res) => {
        console.log(res);
        // toast.error(res.response.data.message)
    });
}

useEffect(() => {
getUserDate();
showBooking();
}, []);

return (
<>
    <section className="profile bg">
    <div className="container">
        <div className="row">
        {user ? (
            <>
            <div className="col-12 bg-body-secondary mt-3 border border-3 rounded-2">
                <div className="user-profile text-center mt-5 d-flex justify-content-center align-items-center">
                <img
                    width="110px"
                    className="rounded-circle mb-3"
                    src={userpic}
                    alt=""
                />
                <div className="user-details d-flex flex-column text-start ms-3">
                    <div className="">Name: <span className="fw-500 ms-1">{user.name}</span> </div>
                    <div className="">Email: <span className="fw-500 ms-1">{user.email}</span></div>
                    <div className="">Phone: <span className="fw-500 ms-1">{user.phoneNumber}</span></div>
                </div>
                </div>
                <button onClick={() => updateData(user.name, user.phoneNumber)} className="d-flex justify-content-center m-auto btn btn-warning px-5 mb-3">Edit</button>
            </div>
            </>
        ) : (
            <>
        <p className="text-center">Loading user data... </p>
            </>
        )}
        </div>
        <div class="section-header text-center pb-4 mt-3">
            <h3 class="h1">My Booking</h3>
        </div>

        <div className="row">
        {booking.map((book) => {
        return ( 
            <div className="col-6" key={book.id}>
            <table className="table table-bordered border-primary">
                <thead>
                <tr>
                    <th scope="col" colSpan="2">Details</th>
                    <th scope="col" colSpan="2">Booking</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Name</td>
                    <td>{user.name}</td>
                    <td>Time</td>
                    <td>{book.time || "22:15:00"}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{user.email}</td>
                    <td>Date</td>
                    <td>{book.date || "2025/15/6"}</td>
                </tr>
                <tr className="position-relative">
                    <td colSpan="4" className="text-center">{book.status}</td>
                    <button 
                    onClick={() => cancelBooking(book._id)} 
                    className="btn-cancle position-absolute ">
                        Cancle Request
                    </button>
                </tr>
                </tbody>
            </table>
            </div>
        );
        })}
</div>

    </div>
    </section>
</>
);
}
