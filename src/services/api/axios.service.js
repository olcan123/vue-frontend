import axios from "axios";

const axiosService = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export default axiosService;