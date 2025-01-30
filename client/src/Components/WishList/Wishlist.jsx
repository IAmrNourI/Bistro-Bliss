import React, { useEffect, useState } from 'react'
import { addToCart, delteWishItem, getWishlist } from '../../network/user.api';
import toast from 'react-hot-toast';



export default function Wishlist() {
    const [isLoding, setIsLoding] = useState(false);
    const [items, setitems] = useState([])
    const [icon, seticon] = useState(null)
    const [currentId, setcurrentId] = useState(0)

    async function getWishCart() {
        setIsLoding(true);
    
        const result = await getWishlist()
            .then((res) => {
                console.log(res);
                
                const updatedItems = res.data.data.menuItems.map((item) => {
                    const date = new Date(item.menuItem.createdAt);
                    const monthName = date.toLocaleString("en-US", { month: "long" });
                    const monthNumber = date.getMonth() + 1;
                    const year = date.getFullYear();
                    const newCreatedAt = `${monthName} ${monthNumber}, ${year}`;
    
                    return { 
                        ...item, 
                        menuItem: {
                            ...item.menuItem,
                            createdAt: newCreatedAt
                        }
                    };
                });
                setitems(updatedItems);
                console.log(updatedItems);
                setIsLoding(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoding(false);
            });
    }

    async function delteItem(id){
        setcurrentId(id)
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
    
    async function addItemToCart(id){
        setIsLoding(true);
        const result = await addToCart({menuItemId:id,quantity:1})
        .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        setIsLoding(false);    
        })
        .catch((res) => {
        setIsLoding(true);
        // toast.error(res.response.data.message);
        console.log(res)
        setIsLoding(false);
        });
    }

    useEffect(() => {
        getWishCart()
    }, [])

return (

    <>
    <section className='p-y'>
        <div className="container">
            <div className="section-header text-center pb-4 mb-5">
                <h3 className="h1">My Wishlist</h3>
            </div>
            
            <div className="row border-bottom ps-5">
                <div className="col-5 ps-5">
                    <h5 className='ps-5'>Product name</h5>
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
                <div className="col-1">
                    <div className="d-flex align-items-center h-100">
                        <i class={currentId == item.menuItem._id ? "fa-solid fa-heart-crack wish-icon cursor-pointer": "fa-solid fa-heart wish-icon cursor-pointer"} 
                        onClick={() => delteItem(item.menuItem._id)}
                        onMouseEnter={() => setcurrentId(item.menuItem._id)} 
                        onMouseLeave={() => setcurrentId(null)} 
                        >
                        </i>
                    </div>
                </div>
                <div className="col-4">
                    <div className="d-flex align-items-center py-3 h-100">
                        <img src={item.menuItem.image} width="60px" alt="" />
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
                <div className="col-2">
                    <div className="d-flex align-items-center py-3 h-100">
                        {/* <input className='quantity-input' defaultValue={1} disabled type="number" name="" id="" /> */}
                        <span style={{ marginLeft: "35px" }}>1</span>
                    </div>
                </div>
                <div className="col-md-3 col-12">
                    <div className="d-flex flex-column align-items-center py-3 h-100">
                        <p className='createdAt'>Added on: {item.menuItem.createdAt} </p>
                        <button onClick={() => addItemToCart(item.menuItem._id)} className='add-btn'>Add to cart</button>
                    </div>
                </div>
                
            </div>
            ))}

        </div>
    </section>
    </>

)

}

