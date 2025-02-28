import React, { useEffect, useState } from 'react'
import { addToCart, getCart, deleteCartItem, checkout } from '../../network/user.api';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

export default function Cart() {
    const [isLoding, setIsLoding] = useState(false);
    const [items, setitems] = useState([])
    const [total, settotal] = useState("")
    const [cartId, setcartId] = useState("")
    const { pathname } = useLocation();


    async function getUserCart(){
        // console.log("hello")
        setIsLoding(true);
        const result = await getCart()
        .then((res) => {
            console.log(res);
            const updatedItems = res.data.data.menuItems.map((item) => {
                const picture = item.menuItem.image.slice(9)
                const date = new Date(item.menuItem.createdAt);
                const monthName = date.toLocaleString("en-US", { month: "long" });
                const monthNumber = date.getMonth() + 1;
                const year = date.getFullYear();
                const newCreatedAt = `${monthName} ${monthNumber}, ${year}`;
                return { 
                    ...item, 
                    menuItem: {
                        ...item.menuItem,
                        createdAt: newCreatedAt,
                        image: picture
                    }
                };
            });
            setitems(updatedItems);
            settotal(res.data.data.totalPrice)
            setcartId(res.data.data._id)
            console.log(updatedItems);
            setIsLoding(false);
        })
        .catch((res) => {
        // toast.error(res.response.data.message);
        if(res.response.data.message == "Cart is Empty"){
            setitems([]);
            settotal(0)
        }
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

    async function UserCheckout(id){
        // console.log(id);
        setIsLoding(true);
        const result = await checkout({cartId:id})
        .then((res) => {
        console.log(res); 
        toast.success(res.data.message)
        getUserCart()

        setIsLoding(false);    
        })
        .catch((res) => {
        console.log(res)
        // toast.error(res.response.data.message);
        setIsLoding(false); 
        });
    }

    useEffect(() => {
        getUserCart()
    }, [])


    useEffect(() => {
        window.scrollTo(0,0)
    }, [pathname]);



return (

    <>
    <section className='p-y cart wish-list'>
        <div className="container">
            <div className="section-header text-center pb-4 mb-5">
                <h1>My Cart</h1>
            </div>
            
            <div className="row border-bottom ps-5 titles">
                <div className="col-4">
                    <h5 className=''>Product name</h5>
                </div>
                <div className="col-2">
                    <h5>Unit price</h5>
                </div>
                <div className="col-4">
                    <h5>Quantity</h5>
                </div>
            </div>

            {items.map((item, index) => (
            <div className="row border-bottom ps-5">
                <div className="col-4">
                    <div className="d-flex align-items-center py-3 h-100">
                        <img src={`http://localhost:5173/${item.menuItem.image}`} width="60px" alt="" />
                        <p className='m-0 ms-3'>{item.menuItem.name}</p>
                    </div>
                </div>
                <div className="col-2">
                    <div className="d-flex align-items-center py-3 h-100">
                        {index === 0 && <span className='discount'>$14.99</span>}
                        {index === 3 && <span className='discount'>$10,50</span>}
                        <p className={index == 0 || index == 3 ? "m-0 ms-1 price bg-price": "m-0 ms-3 price"}>${item.menuItem.price}</p>
                    </div>
                </div>
                <div className="col-3">
                    <div className="d-flex align-items-center py-3 h-100">
                        <button className='quantity' onClick={() => addItemToCart({menuItemId:item.menuItem._id,quantity:1})}>+</button>
                            <p className='mt-3 mx-2'>{item.quantity}</p>
                        <button className='quantity' onClick={() => addItemToCart({menuItemId:item.menuItem._id,quantity:-1,quan:item.quantity})}>-</button>
                    </div>
                </div>
                <div className="col-md-3 col-12">
                    <div className="d-flex flex-column align-items-center py-3 h-100">
                        <p className='createdAt'>Added on: {item.menuItem.createdAt} </p>
                        <button onClick={() => deleteitemFromCart(item.menuItem._id)} className='add-btn'>Delete</button>
                    </div>
                </div>
                
            </div>

            ))}
                <p className=' mt-3 h5 text-center'>Total Price: {total.toString().slice(0, 6)}$</p>
                <div className='text-center'>
                <button onClick={() => UserCheckout(cartId)} className='add-btn' disabled={items.length == 0} >Check Out</button>
                </div>
        </div>
    </section>
    </>

)

}





