
import { axiosInstance } from "./index"

const register = async(data) => {
    return await axiosInstance.post("/register" ,data)
}

const verify = async(data) => { // >> verify-otp
    return await axiosInstance.post("/verify-otp" ,data)
}

const resendOtp = async(data) => {
    return await axiosInstance.post("/resend-otp" ,data)
}

const email = async(data) => {
    return await axiosInstance.post("/email" ,data)
}

const password = async(data) => {
    return await axiosInstance.post("/password" ,data)
}

export { register, verify, resendOtp, email, password }