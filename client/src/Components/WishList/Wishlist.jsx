import React, { useEffect, useState } from 'react'
import { delteWishItem, getWishlist } from '../../network/user.api';
import toast from 'react-hot-toast';



export default function Wishlist() {
    const [isLoding, setIsLoding] = useState(false);
    const [items, setitems] = useState([])



    async function getWishCart(){
        // console.log("hello")
        setIsLoding(true);
        const result = await getWishlist()
        .then((res) => {
        console.log(res.data.data.menuItems);        
        setitems(res.data.data.menuItems)
        console.log(items);
        // toast.success(res.data.message)
        setIsLoding(false);    
        })
        .catch((res) => {
        // toast.error(res.response.data.message);
        console.log(res)
        setIsLoding(false);
        });
    }

    async function delteItem(id){
        setIsLoding(true);
        const result = await delteWishItem(id)
        .then((res) => {
        console.log(res); 
        toast.success(res.data.message)
        getWishCart()
        setIsLoding(false);    
        })
        .catch((res) => {
        console.log(res)
        toast.error(res.response.data.message);
        setIsLoding(false); 
        });
    }

    useEffect(() => {
        getWishCart()
    }, [])


return (

    <>
<div className="row">
    {items?.map((item) => (
        <div key={item._id} className="col-3 mb-2"> 
            <div className="bg-success text-white p-3">
            <p>{item.menuItem.name}</p> 
            <p>{item.menuItem.category}</p>
            <p>{item.menuItem.price} $</p>
            <span onClick={() => delteItem(item.menuItem._id)}>
            <i class="fa-solid fa-heart text-danger cursor-pointer fs-5"></i>
            </span>
            </div>
        </div>
    ))}
</div>
    </>

)

}
