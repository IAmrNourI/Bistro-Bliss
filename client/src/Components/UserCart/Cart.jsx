import React, { useEffect, useState } from 'react'
import { addToCart, getCart, deleteCartItem } from '../../network/user.api';
import toast from 'react-hot-toast';

export default function Cart() {
    const [isLoding, setIsLoding] = useState(false);
    const [items, setitems] = useState([])

    async function getUserCart(){
        // console.log("hello")
        setIsLoding(true);
        const result = await getCart()
        .then((res) => {
        // console.log(res.data.data.menuItems);        
        setitems(res.data.data.menuItems);        
        console.log(items); 
        // setitems(res.data.data.menuItems)
        // toast.success(res.data.message)
        setIsLoding(false);    
        })
        .catch((res) => {
        // toast.error(res.response.data.message);
        console.log(res)
        setIsLoding(false); 
        });
    }


    async function addItemToCart(id){
        // console.log(id)
        
        setIsLoding(true);
        const result = await addToCart(id)
        .then((res) => {
        console.log(res);
        if(id.quantity == -1 && res.data.message == "Added another one to cart"){
            toast.success("Item removed successfully"); 
        }else{
            toast.success(res.data.message) 
        }
        // console.log(id.quan);
        
        if(id.quan == 1){
            deleteitemFromCart(id.menuItemId)
        }
        getUserCart()
        setIsLoding(false);    
        })
        .catch((res) => {
        setIsLoding(true);
        // toast.error(res.response.data.message);
        console.log(res)
        setIsLoding(false);
        });
    }

    async function deleteitemFromCart(id){
        setIsLoding(true);
        const result = await deleteCartItem(id)
        .then((res) => {
        console.log(res); 
        toast.success(res.data.message)
        getUserCart()
        setIsLoding(false);    
        })
        .catch((res) => {
        console.log(res)
        toast.error(res.response.data.message);
        setIsLoding(false); 
        });
    }

    function checkOut(){
        console.log("helllo")
    }

    useEffect(() => {
        getUserCart()
    }, [])


return (

    <>
<div className="row">
    {items?.map((item) => (
        <div key={item._id} className="col-3"> 
            <div className="bg-success text-white p-3">
            <p>{item.menuItem.name}</p> 
            <p>{item.menuItem.category}</p>
            <p>{item.menuItem.price} $</p>

            <div className='d-flex justify-content-centera align-items-sm-center'>
                <button onClick={() => addItemToCart({menuItemId:item.menuItem._id,quantity:1})}>+</button>
                {/* <button className="d-block m-auto" onClick={() => addItemToCart(item.menuItem._id)} >Add To Cart</button> */}
                <p className='mt-3 mx-2'>{item.quantity}</p>
                <button onClick={() => addItemToCart({menuItemId:item.menuItem._id,quantity:-1,quan:item.quantity})}>-</button>
            </div>
            <button onClick={() => deleteitemFromCart(item.menuItem._id)} >Delete</button>
            <button onClick={() => checkOut()} >Check Out</button>
            </div>
        </div>
    ))}
</div>
    </>

)

}





    
