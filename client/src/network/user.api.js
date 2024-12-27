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

const items = async() => {
    return await axiosInstance.get("/menu/")
}

const addItem = async(data) => {
    // console.log(localStorage.getItem("userToken"))
    // return await axiosInstance.post("/menu/add-item", data)
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.post("/menu/add-item", data, {
        
    // headers: {
    // "Content-Type": "application/json",
    // Authorization: "Bearer " + token,
    // },
    withCredentials: true
});
}

const deleteItem = async (data) => {
    const token = localStorage.getItem("userToken");
    return await axiosInstance.delete("/menu/delete-item", {
        data: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
    });
}

const editItem = async (data) => {
    // return await axiosInstance.put("/menu/edit-item", data)
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.put("/menu/edit-item", data, {
        
    headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
    },
});

}


const createContact = async(data) => {
    return await axiosInstance.post("/contact/create-contact", data)
}

const viewContact = async () => {
    // return await axiosInstance.put("/menu/edit-item", data)
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.get("/contact/get-contacts", {
        
    headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
    },
});

}

const createBook = async(data) => {
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.post("/booking/create-booking", data, {
        
    headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
    },
});
}

const getBooking = async() => {
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.get("/booking/get-user-bookings", {
        
    headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
    },
});
}


const getUser = async() => {
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.get("/user/user-details", {
        
    headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
    },
});
}

const updateUser = async(data) => {
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.put("/user/update-user",data, {
        
    headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
    },
});
}

const logOut = async() => {
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.get("/user/logout", {
        
    headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
    },
});
}

    const cancelRequest = async (id) => {
    const token = localStorage.getItem("userToken");
    console.log(id);
    console.log(token);

    return await axiosInstance.post(
        `/booking/cancel-booking/${id}`,
        null, // or {}
        {
        // headers: {
        //     "Content-Type": "application/json",
        //     Authorization: "Bearer " + token,
        // },
        withCredentials: true,
        }
    );
    };



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
        cancelRequest
    }