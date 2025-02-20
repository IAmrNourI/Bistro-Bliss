import React, { useContext, useEffect, useState } from "react";
import { addToCart, addToWishlist, delteWishItem, items } from "../../network/user.api";
import { useLocation, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

// import { CartContext } from "../../Context/CartContext";

export default function RecentMenu() {
const navigate = useNavigate();
const [menu, setmenu] = useState([]);
const [activeLink, setactiveLink] = useState("All");
const location = useLocation()
const [isLoadingCart, setisLoadingCart] = useState(false);
const [subCategory, setsubCategory] = useState([])
const [currentId, setcurrentId] = useState("")


const {category} = location.state || "";

// let {addItemToCart} = useContext(CartContext)

async function addItemToCart(id){
    setcurrentId(id)
    setisLoadingCart(true);
    const result = await addToCart({menuItemId:id,quantity:1})
    .then((res) => {
    console.log(res);
    toast.success(res.data.message)
    setisLoadingCart(false);    
    })
    .catch((res) => {
    console.log(res)
    toast.error(res.response.data.message);
    setisLoadingCart(false);
    });
}

async function addItemToWishlist(id){
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]"); 
    try {
    const result = await addToWishlist({menuItemId:id})
    if(result.data.message == "Item added to wishlist" ){
            wishlist.push(id);
            localStorage.setItem("wishlist", JSON.stringify(wishlist))
            getAllMenu()
        toast(
            <span>
                {result.data.message} <i className="fa-solid fa-heart cursor-pointer"></i>
            </span>
        );
        // toast(
        //     <span>
        //     {result.data.message} <i className="fa-solid fa-heart cursor-pointer"></i>
        // </span>,
        // {
        //     style: {
        //     border: '1px solid #AD343E',
        //     color: '#AD343E',
        //     backgroundColor: '#A9A9A9'
        //     },
        //     iconTheme: {
        //     primary: '#AD343E',
        //     secondary: '#AD343E',
        //     },
        // }
        // );

    }
    }catch(error){
        if(error.response.data.message == "Item already in wishlist" ){
            const result = await delteWishItem(id)        
            .then((res) => {     
                const updateWishlist = wishlist.filter((item) => item !== id);
                localStorage.setItem("wishlist", JSON.stringify(updateWishlist))
                getAllMenu()
                toast(
                    <span>
                        {res.data.message} <i className="fa-solid fa-heart-crack cursor-pointer"></i> 
                    </span>
                );
                })
                .catch((res) => {
                toast.error(res.response.data.message);
                });
        }
    }
}


async function getAllMenu() {
    const result = await items()
    .then((res) => {
        console.log("menu",res.data.items);
        // setmenu(res.data.items);
        const updateImgSrc = res.data.items.map((img) => {
            let currectSrc = img.image.slice(9);
            // console.log(currectSrc);
            return {
                ...img,
                image: currectSrc
            }
        })
        setmenu(updateImgSrc);
        setsubCategory(updateImgSrc)
        
    })
    .catch((res) => {
        console.log(res);
    });
}

async function getBreakfastMenu() {
    const result = await items()
    .then((res) => {
        let breakfastMenu = subCategory.filter((item) => item.category == "Breakfast")
        setmenu(breakfastMenu);
    })
    .catch((res) => {
        console.log(res);
    });
}

async function getMainDishesMenu() {
    const result = await items()
    .then((res) => {
        let MainDishes = subCategory.filter((item) => item.category == "Main Dishes")
        setmenu(MainDishes);
    })
    .catch((res) => {
        console.log(res);
    });
}

async function getDrinksMenu() {
    const result = await items()
    .then((res) => {
        let Drinks = subCategory.filter((item) => item.category == "Drinks")
        setmenu(Drinks);
    })
    .catch((res) => {
        console.log(res);
    });
}

async function getDessertsMenu() {
    const result = await items()
    .then((res) => {
        let Desserts = subCategory.filter((item) => item.category == "Desserts")
        setmenu(Desserts);
    })
    .catch((res) => {
        console.log(res);
    });
}


useEffect(() => {
    if(category == "breakfast"){
        getBreakfastMenu()
        setactiveLink("Breakfast");
    }else if(category == "maindishes"){
        getMainDishesMenu()
        setactiveLink("Main Dishes");
    }else if (category == "drinks") {
        getDrinksMenu()
        setactiveLink("Drinks");
    }else if (category == "desserts") {
        getDessertsMenu()
        setactiveLink("Desserts");
    }else {
        getAllMenu()
        setactiveLink("All");
    }
}, []);

return (
    <>
    <section className="menu p-y">
        <div className="container">
        <div className="section-header text-center pb-4">
            <h3 className="fs-menu">Our Menu</h3>
            <p className="m-auto fade-up">
            We consider all the drivers of change gives you the components{" "}
            <br /> you need to change to create a truly happens.
            </p>
        </div>

        <div className="row d-flex justify-content-center mt-4 ">
            <div
            onClick={() => {
                setactiveLink("All");
                getAllMenu();
            }}
            className={
                activeLink === "All"
                ? "col-lg-2 mb-3 btn-category active-menu"
                : "col-lg-2 mb-3 btn-category cursor-pointer" 
            }
            >
            <span>All</span>
            </div>
            <div
            onClick={() => 
                {setactiveLink("Breakfast")
                getBreakfastMenu()
            }}
            className={
                activeLink === "Breakfast"
                ? "col-lg-2 mb-3 btn-category active-menu"
                : "col-lg-2 mb-3 btn-category cursor-pointer"
            }
            >
            <span>Breakfast</span>
            </div>
            <div
            onClick={() => 
                {setactiveLink("Main Dishes")
                getMainDishesMenu()
                }}
            className={
                activeLink === "Main Dishes"
                ? "col-lg-2 mb-3 btn-category active-menu"
                : "col-lg-2 mb-3 btn-category cursor-pointer"
            }
            >
            <span>Main Dishes</span>
            </div>
            <div
            onClick={() => 
                {setactiveLink("Drinks")
                getDrinksMenu()
                }}
            className={
                activeLink === "Drinks"
                ? "col-lg-2 mb-3 btn-category active-menu"
                : "col-lg-2 mb-3 btn-category cursor-pointer"
            }
            >
            <span>Drinks</span>
            </div>
            <div
            onClick={() => 
                {setactiveLink("Desserts")
                getDessertsMenu()
                }}
            className={
                activeLink === "Desserts"
                ? "col-lg-2 mb-3 btn-category active-menu"
                : "col-lg-2 mb-3 btn-category cursor-pointer"
            }
            >
            <span>Desserts</span>
            </div>
        </div>

        <div className="row">
            {menu?.map((item ,index) => (
            <div key={item._id} className="col-lg-3 col-md-6 gy-5">
                <div className="menu-item text-center border border-1 rounded-3 overflow-hidden position-relative">
                <div className="overflow-hidden">
                    <img
                    className="w-100 img-border"
                    src={`http://localhost:5173/${item.image}`}
                    alt="food"
                    />
                </div>
                <div className="p-2 position-relative">
                    <p className="price mb-1 pt-4">${item.price}</p>
                    <p className="name mb-1">{item.name}</p>
                    <p className="desc mb-2">{item.description}</p>
                    <div className="sub-container">
                        <span></span>
                        {/* <button className="" onClick={() => addItemToCart(item._id)} >Add To Cart</button>    */}
                    </div>
                    <button className="position-absolute add-menu" onClick={() => addItemToCart(item._id)}> <i className="fa-solid fa-cart-shopping"></i> Add To Cart</button>   
                </div>
                    <span onClick={() => addItemToWishlist(item._id)} className="wish-menu-icon position-absolute"
                        onMouseEnter={() => setcurrentId(item._id)} 
                        onMouseLeave={() => setcurrentId(null)}
                        >
                        {/* <i className="fa-regular fa-heart"></i> */}
                        <i 
                            className={` ${JSON.parse(localStorage.getItem("wishlist") || "[]").includes(item._id) 
                            ? (currentId == item._id ? "fa-solid fa-heart-crack text-danger" : "fa-solid fa-heart text-danger") 
                            : "fa-regular fa-heart text-black"}`}
                        >
                        </i>
                    </span>   
                </div>
            </div>
            ))}
        </div>
        </div>
    </section>
    </>
);
}
