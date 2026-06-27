import axios from "axios";


const apiClient = axios.create({
    // baseURL: "http://localhost:8000/api/v1",
    // baseURL: "http://127.0.0.1:8000/api/v1",
    baseURL:"https://ecotrack-production-6bb8.up.railway.app/api/v1",
});

export default apiClient;