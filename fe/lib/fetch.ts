import { getToken } from "@/service/userService"
import axios from "axios"

const API_BASE_URL = "http://localhost:2000/api"

const api = axios.create({
    baseURL: API_BASE_URL,
})

// Add auth token to requests
api.interceptors.request.use(async (config) => {
    const token = await getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
const errorResponse = (error: any): { message: string } => {
    return {
        message: error?.response?.data?.message
    }
}

export {
    errorResponse,
    api
}