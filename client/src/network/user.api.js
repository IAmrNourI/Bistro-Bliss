
import { axiosInstance } from "./index"

const register = async(data) => {
    return await axiosInstance.post("/register" ,data)
}

const verify = async(data) => {
    return await axiosInstance.post("/verify-otp" ,data)
}

export { register, verify }