import axios from "axios";

const authApiClient = axios.create({
    baseURL: "http://localhost:8000"
});



authApiClient.interceptors.request.use(
    (config) => {

        const storeTokens = localStorage.getItem('authTokens');
        if(storeTokens) {
            const tokenObj = JSON.parse(storeTokens);
            if(tokenObj && tokenObj.access){

            config.headers.Authorization = `JWT ${tokenObj.access}`;
            }

        }
        return config;
    },
    (error) => Promise.reject(error)

);

export default authApiClient;