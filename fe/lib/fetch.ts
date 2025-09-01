import axios from "axios"

const API_BASE_URL = "http://localhost:2000/api"

export const api = axios.create({
    baseURL: API_BASE_URL,
})

// Add auth token to requests
api.interceptors.request.use((config) => {
    // const token = localStorage.getItem("access_token")
    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`
    // }
    return config
})
