import React, { useEffect, useState } from "react";
import { cancelRequest, getBooking, getUser, getUserOrder } from "../../network/user.api";
import userpic from "../../assets/userpic.jpg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";


export default function UserProfile() {
const [user, setuser] = useState([]);
const [booking, setbooking] = useState([])
let navigate = useNavigate();
const [order, setorder] = useState([])

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
    setbooking(res.data.data)
    // toast.success(res.data.message)
    const bookingData = res.data.data.map((book) => {
        const dateTime = new Date(book.date_time);
        const hours = dateTime.getHours();
        const minutes = dateTime.getMinutes();
        const time = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;

        return {
            ...book,
            time,
        };
        });
        setbooking(bookingData);
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
        toast.success(res.data.message)
        showBooking()
        // setbooking(res.data.data)
    })
    .catch((res) => {
        console.log(res);
        toast.error(res.response.data.message)
    });

    console.log(result);
    // let res = await 
    // axios.post("http://localhost:8085/api/booking/cancel-booking/676e0b4707280308aa62b0e0");
    // console.log(res);
}

async function getAllOrder(){
    const result = await getUserOrder()
    .then((res) => {
    // console.log(res.data.data.menuItems);    
    console.log(res);
    toast.success(res.data.message);    
    setorder(res.data.orders);
    console.log("heloo");
    console.log(order);
    console.log("heloo");
    
    })
    .catch((res) => {
    toast.error(res.response.data.message);
    console.log(res)
    });
}

useEffect(() => {
getUserDate();
showBooking();
getAllOrder();
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
                    <div className="col-12">
                        <table className="table table-bordered pb-5 ">
                        <thead>
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Date</th>
                            <th scope="col">Time</th>
                            <th scope="col">Status</th>
                            <th scope="col">Request</th>
                            </tr>
                        </thead>
                        {booking?.map((book) => {
                            return (
                            <tbody className="table-row">
                                <tr>
                                <td>{user.name}</td>
                                <td>
                                    {new Date(book.date_time).toLocaleDateString()}
                                </td>
                                <td>{book.time}</td>
                                <td
                                    // className={
                                    //   book.status == "Pending" ? "bg-warning" : null
                                    // }
                                >
                                    {book.status}
                                </td>
                                <td>
                                <button 
                                    onClick={() => cancelBooking(book._id)} 
                                    className="btn btn-outline-danger">
                                        Cancle
                                </button>
                                </td>
                                </tr>
                            </tbody>
                            );
                        })}
                        </table>
                    </div>
                    </div>


                    {/* {order?.map((orederItem) => (
                        <div className='bg-dark' key={orederItem._id}>
                            <div className="row">
                            {orederItem.menuItems.map((menu) => (
                                <div className='col-2 bg-success' key={menu.menuItem._id}>
                                    <p>{menu.menuItem.name}</p> 
                                    <p>{menu.menuItem.category}</p>
                                    <p>{menu.menuItem.price} $</p>
                                    <p>{menu.menuItem.description}</p>
                                </div>
                            ))}
                            </div>
                        </div>
                    ))} */}


    </div>
    </section>

</>
);
}

{/* <table className="table table-bordered pb-5 ">
<thead>
<tr>
    <th scope="col">Name</th>
    <th scope="col">Date</th>
    <th scope="col">Time</th>
    <th scope="col">Status</th>
</tr>
</thead>
{booking.map((book) => {
return (
    <tbody className="table-row">
    <tr>
    <td>
        {book.user.name}
        </td>
        <td>
        {new Date(book.date_time).toLocaleDateString()}
        </td>
        <td>{book.time}</td>
        <td
        className={
            book.status == "Pending" ? "bg-warning" : null
        }
        >
        {book.status}
        </td>
        <td>
        <button
            onClick={() => accept(book._id, book.user._id)}
            className="btn btn-outline-success me-2"
        >
            Accept
        </button>
        <button
            onClick={() => reject(book._id, book.user._id)}
            className="btn btn-outline-danger"
        >
            Reject
        </button>
        </td>
    </tr>
    </tbody>
);
})}
</table> */}


            // <div className="col-6" key={book.id}>
            // <table className="table table-bordered border-primary">
            //     <thead>
            //     <tr>
            //         <th scope="col" colSpan="2">Name</th>
            //         <th scope="col" colSpan="2">Email</th>
            //         {/* <th scope="col" colSpan="2">Time</th>
            //         <th scope="col" colSpan="2">Date</th> */}
            //     </tr>
            //     </thead>
            //     <tbody>
            //     <tr>
            //         <td>Name</td>
            //         <td>{user.name}</td>
            //         <td>Time</td>
            //         <td>{book.time || "22:15:00"}</td>
            //     </tr>
            //     <tr>
            //         <td>Email</td>
            //         <td>{user.email}</td>
            //         <td>Date</td>
            //         <td>{book.date || "2025/15/6"}</td>
            //     </tr>
            //     <tr className="position-relative">
            //         <td colSpan="4" className="text-center">{book.status}</td>
            //         <button 
            //         onClick={() => cancelBooking(book._id)} 
            //         className="btn-cancle position-absolute ">
            //             Cancle Request
            //         </button>
            //     </tr>
            //     </tbody>
            // </table>
            // </div>