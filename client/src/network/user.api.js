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

const cancelRequest = async (id) => {
    const token = localStorage.getItem("userToken");
    return await axiosInstance.post(
        `/booking/cancel-booking/${id}`,
        null, // or {}
        {
        withCredentials: true,
        }
    );
    };

const acceptBooking = async (id) => {
    const token = localStorage.getItem("userToken");
    return await axiosInstance.post(
        `/booking/accept-booking/${id}`,
        null, // or {}
        {
        withCredentials: true,
        }
    );
    };

const rejectBooking = async (id) => {
    const token = localStorage.getItem("userToken");

    return await axiosInstance.post(
        `/booking/reject-booking/${id}`,
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

const appointAsAdmin = async (id) => {
    const token = localStorage.getItem("userToken");

    return await axiosInstance.post(
        `/user/appoint-as-admin/${id}`,
        null, // or {}
        {
        withCredentials: true,
        }
    );
    };


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
        appointAsAdmin
    }