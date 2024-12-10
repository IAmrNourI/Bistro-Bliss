
import { axiosInstance } from "./index"

const register = async(data) => {
    return await axiosInstance.post("/api/register" ,data)
}

export { register }