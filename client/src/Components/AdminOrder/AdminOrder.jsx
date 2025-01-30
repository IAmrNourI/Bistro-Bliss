import React, { useEffect, useState } from 'react'
import { acceptOrder, cancelOrder, deliverOrder, getOrder, shipOrder } from '../../network/user.api';
import toast from 'react-hot-toast';
import { useSocket } from "../../Context/SocketContext"; //added

export default function AdminOrder() {
    const [order, setorder] = useState([])
    const socket = useSocket();
    

    async function getAllOrder(){
        const result = await getOrder()
        .then((res) => {
        // console.log(res.data.data.menuItems);    
        console.log(res); 
        toast.success(res.data.message);    
        setorder(res.data.order);
        console.log(order);
        
        })
        .catch((res) => {
        toast.error(res.response.data.message);
        console.log(res)
        });
    }

    async function accept(id, userId){
        // console.log(id);
        
        const result = await acceptOrder({orderId:id, userId})
        .then((res) => {
        console.log(res); 
        toast.success(res.data.message);    
        getAllOrder()
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
        console.log(res)
        toast.error(res.response.data.message);
        });
    }

    async function cancel(id, userId){
        // console.log(id);
        const result = await cancelOrder({orderId:id, userId})
        .then((res) => {
        console.log(res); 
        toast.success(res.data.message);    
        getAllOrder()

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
        console.log(res)
        toast.error(res.response.data.message);
        });
    }

    async function deliver(id, userId){
        // console.log(id);
        const result = await deliverOrder({orderId:id, userId})
        .then((res) => {
        console.log(res); 
        toast.success(res.data.message);    
        getAllOrder()
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
        console.log(res)
        toast.error(res.response.data.message);
        });
    }

    async function ship(id, userId){
        // console.log(id);
        const result = await shipOrder({orderId:id, userId})
        .then((res) => {
        console.log(res); 
        toast.success(res.data.message);    
        getAllOrder()
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
        console.log(res)
        toast.error(res.response.data.message);
        });
    }

    // handle repeat code ====> (accept, cancel,deliver,ship) ===> in one function 

    useEffect(() => {
        getAllOrder()
    }, [])

return (
    <>


    <div className="col-10 bg-dark">
        {order?.map((orederItem) => (
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
                <div className="bg-danger">{orederItem.status}</div>
                <button onClick={() => accept(orederItem._id, orederItem.user)} className='btn btn-warning w-25 mb-5'>Accept Order</button>
                <button onClick={() => cancel(orederItem._id, orederItem.user)} className='btn btn-secondary w-25 mb-5'>Cancel Order</button>
                <button onClick={() => deliver(orederItem._id, orederItem.user)} className='btn btn-info w-25 mb-5'>Deliver Order</button>
                <button onClick={() => ship(orederItem._id, orederItem.user)} className='btn btn-light w-25 mb-5'>ship Order</button>
                </div>
            </div>
        ))}
        </div>

    </>
)


}
