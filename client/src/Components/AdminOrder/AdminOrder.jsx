import React, { useEffect, useState } from 'react'
import { getOrder } from '../../network/user.api';
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

    useEffect(() => {
        getAllOrder()
    }, [])

return (
    <>
    </>
)


}
