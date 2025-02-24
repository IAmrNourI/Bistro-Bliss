import React, { useEffect, useState } from "react";
import axios from "axios";
import { items, deleteItem, searchMenu } from "../../network/user.api";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

export default function RecentMenu() {
const navigate = useNavigate();
const [menu, setmenu] = useState([]);
const [activeLink, setactiveLink] = useState("All");
const [subCategory, setsubCategory] = useState([])

async function getAllMenu() {
    const result = await items()
    .then((res) => {
        console.log("menu",res.data.items);
        // setmenu(res.data.items);
        const updateImgSrc = res.data.items.map((img) => {
            let currectSrc = img.image.slice(9);
            console.log(currectSrc);
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


async function removeItem(id) {
    const result = await deleteItem({ id })
        .then((res) => {
            toast.success(res.data.message)
            getAllMenu()
        })
        .catch((res) => {
            toast.error(res.response.data.message);
        });
}

function editItem(id,name,price,desc,category){
    navigate("/edit", { state: { id, name, price, desc, category,} });
}

async function handleSearch(e){
    const value = e.target.value
    try {
        const result = await searchMenu({ search: value })
        const updateImgSrc = result.data.data.map((img) => {
            let currectSrc = img.image.slice(9);
            // console.log(currectSrc);
            return {
                ...img,
                image: currectSrc
            }
        })
        console.log(result);
        setmenu(updateImgSrc)
    } catch (error) {
        console.error(error);
    }
}


useEffect(() => {
    getAllMenu();
}, []);

return (
    <>
            <div className="col-10">
                <div className="section-header text-center pb-4">
                    <h3 className="fs-menu">Our Menu</h3>
                    <p className="m-auto">
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
                    
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="position-relative">
                            <input
                                onChange={handleSearch}
                                name="phoneNumber"
                                type="serch"
                                className="form-control mt-4"
                                placeholder="Search"
                            />
                            <i className="fa-solid fa-magnifying-glass position-absolute search-icon"></i>
                        </div>
                    </div>
                </div>


                    <div className="col-lg-3 col-md-6 gy-5">
                        
                        <Link to={"/Add"}
                        className="text-decoration-none position-relative add-item">
                        <div className="menu-item text-center border border-1 rounded-3 overflow-hidden">
                            <div className="overflow-hidden">
                            <img
                            className="w-100 img-border"
                            src={"https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg"}
                            alt="food"
                            />
                            </div>
                        <div className="p-2">
                            <p className="price mb-1">?</p>
                            <p className="name mb-1">Lorem, ipsum.</p>
                            <p className="desc mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                        </div>
                        <div className="position-absolute layout-item d-flex justify-content-center align-items-center">
                            <i class="fa-solid fa-plus  add-icon"></i>
                        </div>
                        </Link>
                    </div>
                    {menu?.map((item) => (
                    <div key={item._id} className="col-lg-3 col-md-6 gy-5">
                        <div className="menu-item text-center border border-1 rounded-3 overflow-hidden position-relative">
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
                            </div>
                            <div className="position-absolute layout-btn d-flex justify-content-center flex-column align-items-center ">
                                <button onClick={() => removeItem(item._id)} className=" mb-2 w-50">Delete item</button>
                                <button onClick={() => editItem(item._id, item.name, item.price, item.description, item.category)} className="w-50">Edit</button>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
    </>
);
}
