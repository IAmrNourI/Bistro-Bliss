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
    return await axiosInstance.post("/user/password", data)
}

const items = async() => {
    return await axiosInstance.get("/menu/")
}

const addItem = async(data) => {
    // console.log(localStorage.getItem("userToken"))
    // return await axiosInstance.post("/menu/add-item", data)
    const token = localStorage.getItem("userToken");    
    return await axiosInstance.post("/menu/add-item", data, {
        
    headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
    },
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



export { register, verify, resendOtp, email, password, items, addItem, deleteItem, editItem }