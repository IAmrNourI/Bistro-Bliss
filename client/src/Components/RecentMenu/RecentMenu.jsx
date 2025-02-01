import React, { useContext, useEffect, useState } from "react";
import { addToCart, addToWishlist, items } from "../../network/user.api";
import { useLocation, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

// import { CartContext } from "../../Context/CartContext";

export default function RecentMenu() {
const navigate = useNavigate();
const [menu, setmenu] = useState([]);
const [activeLink, setactiveLink] = useState("All");
const location = useLocation()
const [isLoding, setIsLoding] = useState(false);
const [heart, setheart] = useState(false)

const {category} = location.state || "";

// let {addItemToCart} = useContext(CartContext)

async function addItemToCart(id){
    // console.log("hello")
    setIsLoding(true);
    const result = await addToCart({menuItemId:id,quantity:1})
    .then((res) => {
    console.log(res);
    toast.success(res.data.message)
    setIsLoding(false);    
    })
    .catch((res) => {
    setIsLoding(true);
    // toast.error(res.response.data.message);
    console.log(res)
    setIsLoding(false);
    });
}

async function addItemToWishlist(id){
    // console.log("hello")
    setIsLoding(true);
    const result = await addToWishlist({menuItemId:id})
    .then((res) => {
    console.log(res);
    setheart(true)
    toast.success(res.data.message)
    setIsLoding(false);    
    })
    .catch((res) => {
    setIsLoding(true);
    toast.error(res.response.data.message);
    console.log(res)
    setIsLoding(false);
    });
}

async function getAllMenu() {
    const result = await items()
    .then((res) => {
        console.log(res.data.items);
        setmenu(res.data.items);
    })
    .catch((res) => {
        console.log(res);
    });
}

async function getBreakfastMenu() {
    const result = await items()
    .then((res) => {
        let breakfastMenu = res.data.items.filter((item) => item.category == "Breakfast")
        setmenu(breakfastMenu);
    })
    .catch((res) => {
        console.log(res);
    });
}

async function getMainDishesMenu() {
    const result = await items()
    .then((res) => {
        let MainDishes = res.data.items.filter((item) => item.category == "Main Dishes")
        setmenu(MainDishes);
    })
    .catch((res) => {
        console.log(res);
    });
}

async function getDrinksMenu() {
    const result = await items()
    .then((res) => {
        let Drinks = res.data.items.filter((item) => item.category == "Drinks")
        setmenu(Drinks);
    })
    .catch((res) => {
        console.log(res);
    });
}

async function getDessertsMenu() {
    const result = await items()
    .then((res) => {
        let Desserts = res.data.items.filter((item) => item.category == "Desserts")
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
            {menu?.map((item) => (
            <div key={item._id} className="col-lg-3 col-md-6 gy-5">
                <div className="menu-item text-center border border-1 rounded-3 overflow-hidden">
                <div className="overflow-hidden">
                    <img
                    className="w-100 img-border"
                    src={item.image}
                    alt="food"
                    />
                </div>
                <div className="p-2">
                    <p className="price mb-1">${item.price}</p>
                    <p className="name mb-1">{item.name}</p>
                    <p className="desc mb-2">{item.description}</p>
                    <div className="sub-container">
                        <span></span>
                        <button className="" onClick={() => addItemToCart(item._id)} >Add To Cart</button>
                        <span onClick={() => addItemToWishlist(item._id)} className=" h5 mt-2 cursor-pointer mt-3">
                        <i class="fa-regular fa-heart"></i>
                        </span>      
                    </div>

                </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    </section>
    </>
);
}
