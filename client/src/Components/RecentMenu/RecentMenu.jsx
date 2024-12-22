import React, { useEffect, useState } from "react";
import axios from "axios";
import { items } from "../../network/user.api";
import { Link } from "react-router-dom";


export default function RecentMenu() {
const [menu, setmenu] = useState([]);
const [activeLink, setactiveLink] = useState("All");

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
    getAllMenu();
}, []);

return (
    <>
    <section className="menu p-y">
        <div className="container">
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
            {menu.map((item) => (
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
                    <p className="desc mb-0">{item.description}</p>
                </div>
                </div>
            </div>
            ))}
            <div className="col-lg-3 col-md-6 gy-5">
                <Link to="/Add"
                className="text-decoration-none menu-item text-center border border-1 
                rounded-3 d-flex justify-content-center align-items-center bg-body-secondary">
                    <i className="fa-solid fa-plus h2"></i>
                </Link>
            </div>
        </div>
        </div>
    </section>
    </>
);
}
