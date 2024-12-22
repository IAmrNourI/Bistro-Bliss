
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
    return await axiosInstance.post("/menu/add-item", data)
}

export { register, verify, resendOtp, email, password, items, addItem }