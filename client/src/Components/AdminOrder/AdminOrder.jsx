import React, { useEffect, useState } from 'react'
import { acceptOrder, cancelOrder, deliverOrder, getOrder, shipOrder } from '../../network/user.api';
import toast from 'react-hot-toast';

export default function AdminOrder() {
    const [order, setorder] = useState([])

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

    async function accept(id){
        // console.log(id);
        
        const result = await acceptOrder({orderId:id})
        .then((res) => {
        console.log(res); 
        toast.success(res.data.message);    
        getAllOrder()
        })
        .catch((res) => {
        console.log(res)
        toast.error(res.response.data.message);
        });
    }

    async function cancel(id){
        // console.log(id);
        const result = await cancelOrder({orderId:id})
        .then((res) => {
        console.log(res); 
        toast.success(res.data.message);    
        getAllOrder()
        })
        .catch((res) => {
        console.log(res)
        toast.error(res.response.data.message);
        });
    }

    async function deliver(id){
        // console.log(id);
        const result = await deliverOrder({orderId:id})
        .then((res) => {
        console.log(res); 
        toast.success(res.data.message);    
        getAllOrder()
        })
        .catch((res) => {
        console.log(res)
        toast.error(res.response.data.message);
        });
    }

    async function ship(id){
        // console.log(id);
        const result = await shipOrder({orderId:id})
        .then((res) => {
        console.log(res); 
        toast.success(res.data.message);    
        getAllOrder()
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
                <button onClick={() => accept(orederItem._id)} className='btn btn-warning w-25 mb-5'>Accept Order</button>
                <button onClick={() => cancel(orederItem._id)} className='btn btn-secondary w-25 mb-5'>Cancel Order</button>
                <button onClick={() => deliver(orederItem._id)} className='btn btn-info w-25 mb-5'>Deliver Order</button>
                <button onClick={() => ship(orederItem._id)} className='btn btn-light w-25 mb-5'>ship Order</button>
                </div>
            </div>
        ))}
        </div>

    </>
)


}
