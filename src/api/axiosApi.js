import axios from "axios";

const api = axios.create(
    {
        baseURL: "https://dummyjson.com",
         params: {
            limit: 0
        },
        headers: {
            "Content-Type": "application/JSON",
        },
        // withCredentials: true,
        timeout: 10000,
    }
)

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;