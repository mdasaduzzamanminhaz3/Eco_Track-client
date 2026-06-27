import axios from "axios";

const authApiClient = axios.create({
    // baseURL: "http://localhost:8000/api/v1",
    // baseURL: "http://127.0.0.1:8000/api/v1",
    baseURL:"https://ecotrack-production-6bb8.up.railway.app/api/v1",

});



authApiClient.interceptors.request.use(
    (config) => {

        const storeTokens = localStorage.getItem('authTokens');
        if(storeTokens) {
            const tokenObj = JSON.parse(storeTokens);
            if(tokenObj && tokenObj.access){

            config.headers.Authorization = `Bearer ${tokenObj.access}`;
            }

        }
        return config;
    },
    (error) => Promise.reject(error)

);

export default authApiClient;