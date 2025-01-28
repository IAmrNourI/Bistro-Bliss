import { axiosInstance } from "./index"


const register = async(data) => {
    return await axiosInstance.post("/user/register", data)
}

const verify = async(data) => { // >> verify-otp
    return await axiosInstance.post("/user/verify-otp", data)
}

const resendOtp = async(data) => {
    return await axiosInstance.post("/user/resend-otp", data)
}

const email = async(data) => {
    return await axiosInstance.post("/user/email", data)
}

const password = async(data) => {
    return await axiosInstance.post("/user/password", data, { withCredentials: true })
}

const forgetPassword = async(data) => {
    return await axiosInstance.post("/user/forget-password", data, { withCredentials: true })
}

const verifyResetPassword = async(data) => {
    return await axiosInstance.post("/user/verify-reset-password", data, { withCredentials: true })
}

const resetPassword = async(data) => {
    return await axiosInstance.post("/user/reset-password", data, { withCredentials: true })
}

const getNotifications = async(data) => {
    return await axiosInstance.get("/user/get-user-notifications", { withCredentials: true })
}

const items = async() => {
    return await axiosInstance.get("/menu/")
}

const searchMenu = async (data) => {
    const token = localStorage.getItem("userToken");
    return await axiosInstance.post("/menu/search-item", data, {
                withCredentials: true
    });
}

const addItem = async(data) => {
    // console.log(localStorage.getItem("userToken"))
    // return await axiosInstance.post("/menu/add-item", data)
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.post("/menu/add-item", data, {
    withCredentials: true
});
}

const deleteItem = async (data) => {
    const token = localStorage.getItem("userToken");
    return await axiosInstance.delete("/menu/delete-item", {
        data: data,
        withCredentials: true
    });
}

const editItem = async (data) => {
    // return await axiosInstance.put("/menu/edit-item", data)
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.put("/menu/edit-item", data, {
        withCredentials: true
});

}


const createContact = async(data) => {
    return await axiosInstance.post("/contact/create-contact", data)
}

const viewContact = async () => {
    // return await axiosInstance.put("/menu/edit-item", data)
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.get("/contact/get-contacts", {
        withCredentials: true
});
}

const searchContact = async (data) => {
    const token = localStorage.getItem("userToken");
    return await axiosInstance.post("/contact/search-contacts", data, {
                withCredentials: true
    });
}

const createBook = async(data) => {
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.post("/booking/create-booking", data, {
        withCredentials: true
});
}

const getBooking = async() => {
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.get("/booking/get-user-bookings", {
        withCredentials: true
});
}

const getAllBooking = async() => {
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.get("/booking/get-all-bookings", {
        withCredentials: true
});
}

const getUpcomingBooking = async() => {
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.get("/booking/get-upcoming-bookings", {
        withCredentials: true
});
}

const getPendingBooking = async() => {
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.get("/booking/get-pending-bookings", {
        withCredentials: true
});
}


const getUser = async() => {
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.get("/user/user-details", {
        withCredentials: true
});
}

const updateUser = async(data) => {
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.put("/user/update-user",data, {
        withCredentials: true
});
}

const logOut = async() => {
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.get("/user/logout", {
        withCredentials: true
});
}

const cancelRequest = async (id,) => {
    const token = localStorage.getItem("userToken");
    return await axiosInstance.post(
        `/booking/cancel-booking/${id}`,
        null, // or {}
        {
        withCredentials: true,
        }
    );
    };

const acceptBooking = async (id,userId) => {
    const token = localStorage.getItem("userToken");
    return await axiosInstance.post(
        `/booking/accept-booking/${id}/${userId}`,
        null, // or {}
        {
        withCredentials: true,
        }
    );
    };

const rejectBooking = async (id,userId) => {
    const token = localStorage.getItem("userToken");

    return await axiosInstance.post(
        `/booking/reject-booking/${id}/${userId}`,
        null, // or {}
        {
        withCredentials: true,
        }
    );
    };

            
const getAllUsers = async() => {
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.get("/user/get-all-users", {
        withCredentials: true
});
}

const searchUser = async (data) => {
    const token = localStorage.getItem("userToken");
    return await axiosInstance.post("/user/email", data, {
        withCredentials: true
    });
};

const appointAsAdmin = async (id) => {
    const token = localStorage.getItem("userToken"); 
    return await axiosInstance.post(
        `/user/appoint-as-admin/${id}`,
        null,
        {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
            withCredentials: true,
        }
    );
};

const uploadImg = async (data) => {
    const token = localStorage.getItem("userToken");
    return await axiosInstance.delete("/menu/upload", {
        data: data,
        withCredentials: true
    });
}

const addToCart = async(data) => {
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.post("/cart/add-to-cart", data, {
    withCredentials: true
});
}

const getCart = async() => {
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.get("/cart/get-cart", {
    withCredentials: true
});
}

const addToWishlist = async(data) => {
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.post("/wishlist/add-to-wishlist", data, {
    withCredentials: true
});
}

const deleteCartItem = async (id) => {
    const token = localStorage.getItem("userToken"); 
    return await axiosInstance.delete(
        `/cart/remove-from-cart/${id}`,
        {
            withCredentials: true,
        }
    );
};

const getWishlist = async() => {
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.get("/wishlist/get-wishlist", {
    withCredentials: true
});
}

const delteWishItem = async (id) => {
    const token = localStorage.getItem("userToken"); 
    return await axiosInstance.delete(
        `/wishlist/delete-from-wishlist/${id}`,
        {
            withCredentials: true,
        }
    );
};

const checkout = async(data) => {
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.post("/order/checkout", data,  {
    withCredentials: true
});
}

const getOrder = async() => {
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.get("/order/get-all-orders", {
    withCredentials: true
});
}

const acceptOrder = async(data) => {
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.post("/order/accept-order", data, {
    withCredentials: true
});
}

const cancelOrder = async(data) => {
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.post("/order/cancel-order", data, {
    withCredentials: true
});
}

const deliverOrder = async(data) => {
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.post("/order/deliver-order", data, {
    withCredentials: true
});
}

const shipOrder = async(data) => {
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.post("/order/ship-order", data, {
    withCredentials: true
});
}

const getUserOrder = async() => {
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.get("/order/get-user-orders", {
    withCredentials: true
});
}




    // withCredentials: true

export { register, 
        verify, 
        resendOtp, 
        email, 
        password, 
        items, 
        addItem, 
        deleteItem, 
        editItem, 
        createContact, 
        viewContact, 
        createBook,
        getBooking,
        getUser,
        updateUser,
        logOut,
        cancelRequest,
        acceptBooking,
        rejectBooking,
        getAllUsers,
        appointAsAdmin,
        getAllBooking,
        uploadImg,
        getUpcomingBooking,
        getPendingBooking,
        searchContact,
        searchUser,
        searchMenu,
        forgetPassword,
        verifyResetPassword,
        resetPassword,
        getNotifications,
        addToCart,
        getCart,
        addToWishlist,
        getWishlist,
        deleteCartItem,
        delteWishItem,
        checkout,
        getOrder,
        acceptOrder,
        cancelOrder,
        deliverOrder,
        shipOrder,
        getUserOrder
    }