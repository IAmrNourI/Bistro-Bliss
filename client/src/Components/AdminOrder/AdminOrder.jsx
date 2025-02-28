import React, { useEffect, useState } from "react";
import {
acceptOrder,
cancelOrder,
deliverOrder,
getOrder,
shipOrder,
} from "../../network/user.api";
import toast from "react-hot-toast";
import { useSocket } from "../../Context/SocketContext"; //added

export default function AdminOrder() {
const [order, setorder] = useState([]);
const socket = useSocket();
const [showTime, setshowTime] = useState(false);
const [currentId, setcurrentId] = useState("");
const [hours, sethours] = useState("");
const [minutes, setminutes] = useState("");

async function getAllOrder() {
const result = await getOrder()
    .then((res) => {
    // console.log(res.data.data.menuItems);
    const updatedItems = res.data.order.map((order) => {
        const updatedMenuItems = order.menuItems.map((menuItem) => {
        const imgSrc = menuItem.menuItem.image.slice(9);
        return {
            ...menuItem,
            menuItem: {
            ...menuItem.menuItem,
            image: imgSrc,
            },
        };
        });
        return { ...order, menuItems: updatedMenuItems };
    });
    setorder(updatedItems);
    })
    .catch((res) => {
    toast.error(res.response.data.message);
    console.log(res);
    });
}

async function accept(id, userId, index) {
// console.log(id);
console.log(id);
console.log(index);
const result = await acceptOrder({ orderId: id, hours, minutes })
    .then((res) => {
    console.log(res);
    toast.success(res.data.message);
    const acceptedOreder =
        JSON.parse(localStorage.getItem("acceptedOrders")) || [];
    acceptedOreder.push(id);
    localStorage.setItem("acceptedOrders", JSON.stringify(acceptedOreder));
    setshowTime(false);
    getAllOrder();
    //---------------------
    if (socket) {
        socket.emit("notification", {
        targetUserId: userId,
        msg: "Your Order is being prepared.",
        });
        toast.success("Notification sent!");
    } else {
        toast.error("Socket not connected.");
    }
    //-----------------------
    })
    .catch((res) => {
    console.log(res);
    toast.error(res.response.data.message);
    });
}

async function cancel(id, userId) {
// console.log(id);
const result = await cancelOrder({ orderId: id, userId })
    .then((res) => {
    console.log(res);
    toast.success(res.data.message);
    getAllOrder();

    //---------------------
    if (socket) {
        socket.emit("notification", {
        targetUserId: userId,
        msg: "Your Order has been cancelled.",
        });
        toast.success("Notification sent!");
    } else {
        toast.error("Socket not connected.");
    }
    //-----------------------
    })
    .catch((res) => {
    console.log(res);
    toast.error("Order Already Cancelled");
    });
}

async function deliver(id, userId) {
// console.log(id);
const result = await deliverOrder({ orderId: id, userId })
    .then((res) => {
    console.log(res);
    toast.success(res.data.message);
    getAllOrder();
    //---------------------
    if (socket) {
        socket.emit("notification", {
        targetUserId: userId,
        msg: "Your Order has been Delivered.",
        });
        toast.success("Notification sent!");
    } else {
        toast.error("Socket not connected.");
    }
    //-----------------------
    })
    .catch((res) => {
    console.log(res);
    toast.error(res.response.data.message);
    });
}

async function ship(id, userId) {
// console.log(id);
const result = await shipOrder({ orderId: id, userId })
    .then((res) => {
    console.log(res);
    toast.success(res.data.message);
    getAllOrder();
    //---------------------
    if (socket) {
        socket.emit("notification", {
        targetUserId: userId,
        msg: "Your Order is being Shipped for you.",
        });
        toast.success("Notification sent!");
    } else {
        toast.error("Socket not connected.");
    }
    //-----------------------
    })

    .catch((res) => {
    console.log(res);
    toast.error(res.response.data.message);
    });
}

// handle repeat code ====> (accept, cancel,deliver,ship) ===> in one function

useEffect(() => {
getAllOrder();
}, []);

function hrs(e) {
const hrsValue = e.target.value;
sethours(hrsValue);
}

function mnis(e) {
const minValue = e.target.value;
setminutes(minValue);
}

return (
<>
    <div className="col-10 bg pb-5">
    <div className="container">
        {order?.map((orederItem, index) => (
        <>
            <div className="row border-bottom mt-4">
            <div className="col-lg-3 col-md-4 col-sm-4 col-4">
                <h5 className="">Product name</h5>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-4 ps-5">
                <h5>Unit price</h5>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-4">
                <h5>Quantity</h5>
            </div>
            </div>
            <div className="row">
            <div className="col-md-8">
                <div className="row">
                {orederItem.menuItems.map((menu) => (
                    <>
                    <div className="col-5 border-bottom">
                        <div className="d-flex align-items-center py-3 h-100">
                        <img
                            src={menu.menuItem.image}
                            width="60px"
                            alt=""
                        />
                        <p className="m-0 ms-3">{menu.menuItem.name}</p>
                        </div>
                    </div>
                    <div className="col-4 border-bottom">
                        <div className="d-flex align-items-center py-3 h-100">
                        <p className="m-0 ms-3 price">
                            ${menu.menuItem.price}
                        </p>
                        </div>
                    </div>
                    <div className="col-3 border-bottom">
                        <div className="d-flex align-items-center py-3 h-100">
                        <p className="mt-3 ps-4">{menu.quantity}</p>
                        </div>
                    </div>
                    </>
                ))}
                </div>
            </div>

            <div className="col-md-4 px-0">
                <div className="h-100 bg-white border border-1 border-success d-flex flex-column justify-content-center p-3">
                <span className="confirmed mb-3">
                    <i className="fa-solid fa-check h6 m-0"></i>
                </span>
                <h4>Order Confirmed</h4>
                <h6
                    style={{ fontSize: "13px" }}
                    className="text-secondary border-bottom border-2 pb-2"
                >
                    we hope you enjoy your food
                </h6>
                <h6 className="price-order mt-3 bg ">
                    Subtotal :{" "}
                    <span className="fw-500 text-black">
                    {orederItem.totalPrice.toString().slice(0, 5)}$
                    </span>
                </h6>
                <h6 className="price-order bg">
                    Shipping :<span className="fw-500 text-black">15$</span>
                </h6>
                <h6 className="price-order bg border-2">
                    Total :{" "}
                    <span className="fw-500 text-black">
                    {(orederItem.totalPrice + 15).toString().slice(0, 5)}$
                    </span>
                </h6>

                <h6 className=" mt-1 text-center">{orederItem.status}</h6>
                {/* <span class="loader"></span> */}

                {JSON.parse(
                    localStorage.getItem("acceptedOrders")
                )?.includes(orederItem._id) ? (
                    <>
                    {orederItem.status === "preparing" || orederItem.status === "shipping" ? 
                    <>                    
                    <button
                        disabled={orederItem.status === "preparing"}
                        onClick={() =>
                        deliver(orederItem._id, orederItem.user)
                        }
                        className="add-btn deliverd mt-2"
                    >
                        Deliver Order
                    </button>
                    <button
                        disabled={orederItem.status === "shipping"}
                        onClick={() => ship(orederItem._id, orederItem.user)}
                        className="add-btn ship mt-2"
                    >
                        ship Order
                    </button> </>:null }
                    </>
                ) : (

                    <>
                    {orederItem.status === "cancelled" ? <></> : <>
                        <button
                        disabled={orederItem.status === "cancelled"}
                        onClick={() => {
                        setshowTime(true);
                        setcurrentId(orederItem._id);
                        }}
                        className="add-btn accept"
                    >
                        Accept Order
                    </button>
                    <button
                        onClick={() =>
                        cancel(orederItem._id, orederItem.user)
                        }
                        className="add-btn cancel mt-2"
                    >
                        Cancel Order
                    </button>
                    </>}
                    </>
                )}

                {showTime && currentId == orederItem._id ? (
                    <div className="mt-2">
                    <div className="d-flex justify-content-center">
                        <div className="d-flex flex-column me-3">
                        <label htmlFor="">hrs</label>
                        <input
                            maxLength={1}
                            className="time-input ps-1"
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]"
                            onInput={(e) => {
                            e.target.value = e.target.value
                                .replace(/[^0-9]/g, "")
                                .slice(0, 2);
                            }}
                            onChange={(e) => hrs(e)}
                        />
                        </div>
                        <div className="d-flex flex-column">
                        <label htmlFor="">mins</label>
                        <input
                            maxLength={2}
                            className="time-input ps-1"
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]"
                            onInput={(e) => {
                            e.target.value = e.target.value
                                .replace(/[^0-9]/g, "")
                                .slice(0, 2);
                            }}
                            onChange={(e) => mnis(e)}
                        />
                        </div>
                    </div>
                    <div className="text-center">
                        <button
                        onClick={() =>
                            accept(orederItem._id, orederItem.user, index)
                        }
                        disabled={
                            minutes.length === 0 || hours.length === 0
                        }
                        className="add-btn w-25 mt-2 accept"
                        >
                        Send
                        </button>
                    </div>
                    </div>
                ) : null}
                </div>
            </div>
            </div>
        </>
        ))}
    </div>
    </div>
</>
);
}

