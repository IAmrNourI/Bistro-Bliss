import React, { useEffect, useState } from "react";
import { cancelRequest, getActiveOrder, getBooking, getHistoryOrder, getUser, getUserOrder } from "../../network/user.api";
import userpic from "../../assets/userpic.jpg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function UserProfile() {
const [user, setuser] = useState([]);
const [booking, setbooking] = useState([])
let navigate = useNavigate();
const [order, setorder] = useState([])
const [activeOrder, setactiveOrder] = useState([])
const [activeLink, setactiveLink] = useState("My Orders");
const [historyOrders, sethistoryOrders] = useState([])
const [profilePic, setprofilePic] = useState("")


async function getUserDate() {
const result = await getUser()
    .then((res) => {
    console.log(res);
    setuser(res.data.data);
    const picture = res.data.data.profilePic.slice(9)
    setprofilePic(picture)
    console.log(picture);
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

// async function getAllOrder(){
//     const result = await getUserOrder()
//     .then((res) => {
//     console.log(res);
//     // toast.success(res.data.message); 
//         const updatedItems = res.data.orders.map((order) => {
//             const date = new Date(order.updatedAt);
//             const monthName = date.toLocaleString("en-US", { month: "long" });
//             const monthNumber = date.getMonth() + 1;
//             const year = date.getFullYear();
//             const newCreatedAt = `${monthName} ${monthNumber}, ${year}`;
//             return{
//                 ...order,
//                 updatedAt: newCreatedAt
//             }
//         })
//     setorder(updatedItems);
//     console.log(updatedItems);
//     })
//     .catch((res) => {
//     toast.error(res.response.data.message);
//     console.log(res)
//     });
// }

async function getUserActiveOrder(){
    const result = await getActiveOrder()
    .then((res) => {
    console.log("active order",res);
    // toast.success(res.data.message); 
    const updatedItems = res.data.activeOrders.map((order) => {
        const updatedMenuItems = order.menuItems.map((menuItem) => {
            const imgSrc = menuItem.menuItem.image.slice(9)
            return {
                ...menuItem,
                menuItem: {
                    ...menuItem.menuItem,
                    image: imgSrc
                }
            };
        });
        return { ...order, menuItems: updatedMenuItems };
    })
    setactiveOrder(updatedItems);
    })
    .catch((res) => {
    toast.error(res.response.data.message);
    console.log(res)
    });
}

async function getUserHistoryOrder(){
    const result = await getHistoryOrder()
    .then((res) => {
    console.log("history order",res);
    // toast.success(res.data.message); 
    const updatedItems = res.data.historyOrders.map((order) => {
        const updatedMenuItems = order.menuItems.map((menuItem) => {
            const imgSrc = menuItem.menuItem.image.slice(9)
            return {
                ...menuItem,
                menuItem: {
                    ...menuItem.menuItem,
                    image: imgSrc
                }
            };
        });
        return { ...order, menuItems: updatedMenuItems };
    })
    console.log(updatedItems);
    sethistoryOrders(updatedItems);
    })
    .catch((res) => {
    toast.error(res.response.data.message);
    console.log(res)
    });
}

useEffect(() => {
getUserDate();
getUserActiveOrder()
getUserHistoryOrder()
// showBooking();
    setactiveLink("Active Orders");
}, []);

return (
<>
<section className="bg pb-5">
    <div className="container">
        <div className="p-y w-100">
        {user ? (
            <>
            <div className="user-information">
                {/* <div className=""> */}
                <img
                    width="100px"
                    className="rounded-circle mb-3 image-profile"
                    src={`http://localhost:5173/${profilePic}`}
                    alt=""
                />
                <div className="profile-details">
                    <h6 className="price-order bg">Name : 
                        <span className="fw-500 text-black">{user.name}</span>
                    </h6>
                    <h6 className="price-order bg">Email : 
                        <span className="fw-500 text-black">{user.email}</span>
                    </h6>
                    <h6 className="price-order bg">Phone : 
                        <span className="fw-500 text-black">{user.phoneNumber}</span>
                    </h6>
                </div>
                <button onClick={() => updateData(user.name, user.phoneNumber, profilePic,)} className="button-edit">Edit</button>
                </div>
            {/* </div> */}
            </>
        ) : (
            <>
        <p className="text-center">Loading user data... </p>
            </>
        )}
        </div>

        <div className="row d-flex justify-content-center mt-4 ">
            <div
            onClick={() => {
                setactiveLink("Active Orders");
                getUserActiveOrder();
            }}
            className={
                activeLink === "Active Orders"
                ? "col-lg-6 mb-3 btn-category active-menu w-auto"
                : "col-lg-6 mb-3 btn-category bg-white cursor-pointer w-auto" 
            }
            >
            <span>Active Orders</span>
            </div>

            <div
            onClick={() => 
                {setactiveLink("History Orders")
                getUserHistoryOrder()
            }}
            className={
                activeLink === "History Orders"
                ? "col-lg-6 mb-3 btn-category active-menu w-auto"
                : "col-lg-6 mb-3 btn-category bg-white cursor-pointer w-auto"
            }
            >
            <span>History Order</span>
            </div>

            <div
            onClick={() => 
                {setactiveLink("My Booking")
                showBooking()
            }}
            className={
                activeLink === "My Booking"
                ? "col-lg-6 mb-3 btn-category active-menu"
                : "col-lg-6 mb-3 btn-category bg-white cursor-pointer"
            }
            >
            <span>My Booking</span>
            </div>
        </div>

        <section className="mt-5">
                {activeLink == "My Booking" ? (
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
                ): null}
        </section>

        <section className="mt-4">
            {activeLink == "Active Orders" ? (
            activeOrder?.map((orederItem) => (
                <>
                    <div className="row border-bottom">
                        <div className="col-lg-3 col-md-4 col-sm-4 col-4">
                            <h5 className=''>Product name</h5>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-4 col-4 ps-5">
                            <h5>Unit price</h5>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-4 col-4">
                            <h5>Quantity</h5>
                        </div>
                    </div>
                            
                    <div className="row mb-5">
                        <div className="col-md-8">
                            <div className="row">
                            {orederItem?.menuItems?.map((menu) => (
                        <>
                                <div className="col-5 border-bottom">
                                    <div className="d-flex align-items-center py-3 h-100">
                                        <img src={menu.menuItem.image} width="60px" alt="" />
                                        <p className='m-0 ms-3'>{menu.menuItem.name}</p>
                                    </div>
                                </div>
                                <div className="col-4 border-bottom">
                                    <div className="d-flex align-items-center py-3 h-100">
                                        <p className="m-0 ms-3 price">${menu.menuItem.price}</p>
                                    </div>
                                </div>
                                <div className="col-3 border-bottom">
                                    <div className="d-flex align-items-center py-3 h-100">
                                            <p className='mt-3 ps-4'>{menu.quantity}</p>
                                    </div>
                                </div>
                        </>
                    ))}
                            </div>
                        </div>  
                        <div className="col-md-4 px-0">
                            <div className="h-100 bg-white border border-1 border-success d-flex flex-column justify-content-center p-3">
                                    
                                <span className="confirmed mb-3"><i className="fa-solid fa-check h6 m-0"></i></span>
                                <h4>Order Confirmed</h4>
                                <h6 style={{fontSize: "13px"}} className="text-secondary border-bottom border-2 pb-2">we hope you enjoy your food</h6>
                                <h6 className="price-order mt-3 bg ">Subtotal : <span className="fw-500 text-black">
                                    {orederItem.totalPrice.toString().slice(0, 5)}$</span>
                                </h6>
                                <h6 className="price-order bg">Shipping : 
                                    <span className="fw-500 text-black">15$</span>
                                </h6>
                                <h6 className="price-order bg border-2">Total : <span className="fw-500 text-black">
                                    {(orederItem.totalPrice + 15).toString().slice(0, 5)}$</span>
                                </h6>
            
                                    <h6 className=" mt-1 text-center">{orederItem.status}</h6>
                                    <span class="loader"></span>
                            </div>
                        </div>
                    </div>
                </>
            ))
            ): null}
        </section>

        <section className="mt-4">
            {activeLink == "History Orders" ? (
            historyOrders?.map((orederItem) => (
                <>
                    <div className="row border-bottom">
                        <div className="col-lg-3 col-md-4 col-sm-4 col-4">
                            <h5 className=''>Product name</h5>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-4 col-4 ps-5">
                            <h5>Unit price</h5>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-4 col-4">
                            <h5>Quantity</h5>
                        </div>
                    </div>
                            
                    <div className="row mb-5">
                        <div className="col-md-8">
                            <div className="row">
                            {orederItem?.menuItems?.map((menu) => (
                        <>
                                <div className="col-5 border-bottom">
                                    <div className="d-flex align-items-center py-3 h-100">
                                        <img src={menu.menuItem.image} width="60px" alt="" />
                                        <p className='m-0 ms-3'>{menu.menuItem.name}</p>
                                    </div>
                                </div>
                                <div className="col-4 border-bottom">
                                    <div className="d-flex align-items-center py-3 h-100">
                                        <p className="m-0 ms-3 price">${menu.menuItem.price}</p>
                                    </div>
                                </div>
                                <div className="col-3 border-bottom">
                                    <div className="d-flex align-items-center py-3 h-100">
                                            <p className='mt-3 ps-4'>{menu.quantity}</p>
                                    </div>
                                </div>
                        </>
                    ))}
                            </div>
                        </div>  
                        <div className="col-md-4 px-0">
                            <div className="h-100 bg-white border border-1 border-success d-flex flex-column justify-content-center p-3">
                                    
                                <span className="confirmed mb-3"><i className="fa-solid fa-check h6 m-0"></i></span>
                                <h4>Order Confirmed</h4>
                                <h6 style={{fontSize: "13px"}} className="text-secondary border-bottom border-2 pb-2">we hope you enjoy your food</h6>
                                <h6 className="price-order mt-3 bg ">Subtotal : <span className="fw-500 text-black">
                                    {orederItem.totalPrice.toString().slice(0, 5)}$</span>
                                </h6>
                                <h6 className="price-order bg">Shipping : 
                                    <span className="fw-500 text-black">15$</span>
                                </h6>
                                <h6 className="price-order bg border-2">Total : <span className="fw-500 text-black">
                                    {(orederItem.totalPrice + 15).toString().slice(0, 5)}$</span>
                                </h6>
            
                                    <h6 className=" mt-1 text-center">{orederItem.status}</h6>
                                    <span class="loader"></span>
                            </div>
                        </div>
                    </div>
                </>
            ))
            ): null}
        </section>

    </div>
    </section>
</>
);
}






