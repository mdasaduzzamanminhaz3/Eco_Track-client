import  { useEffect, useState } from 'react';
import apiClient from '../services/api-client';
import authApiClient from '../services/auth-api-client';

const useAuth = () => {
    const [user,setUser] = useState(null);
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(true);
    const getToken = () => {
        const token = localStorage.getItem('authTokens');
        return token ? JSON.parse(token) : null;
    };

    const [authTokens, setAuthTokens] = useState(getToken());
    // logout user
    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        setLoading(false);
        localStorage.removeItem('authTokens');
    };

    const fetchUserProfile = async (tokensToUse= authTokens) => {
        if (!tokensToUse?.access) return null;
        try {
            const response = await apiClient.get("/api/v1/auth/users/me/", {
                headers: { Authorization: `Bearer ${tokensToUse.access}` },
            });
            return response.data;
        }catch (error) {
            console.log("Error fetching user profile:", error);
            logoutUser();
            return null;
        }
    };
    
    
    useEffect(() => {
        let isMounted = true; // flag to track if component is mounted
        const getUser = async () => {
            if (authTokens) {
                const data = await fetchUserProfile(authTokens);
                if (isMounted && data) {
                    setUser(data);
                }
            }
            if (isMounted) setLoading(false);
        };
        getUser();  
        return () => {
            isMounted = false; // cleanup function to set flag to false when component unmounts
        };
    },[authTokens]);

    const handleAPIError = (error, defaultMessage = "Something went wrong ! Try again") => {
        if(error.response && error.response.data){
            const errorMessage = Object.values(error.response.data).flat().join("\n");
            setError(errorMessage);
            return {success: false, message: errorMessage};

        }
        setError(defaultMessage);
        return {success: false, message: defaultMessage};
    };


    //update user profile
    const updateUserProfile = async (data) => {
        setError("");
        try {
            const response = await authApiClient.patch('/api/v1/auth/users/me/', data);
            setUser(response.data);
            return {success: true, message: "Profile updated successfully"};

        } catch (error) {
            return handleAPIError(error);
        }
    };

    //change password
    const changePassword = async (data) => {
        setError("");
        try {
            await authApiClient.post('/api/v1/auth/users/set_password/', data);
            return {success: true, message: "Password changed successfully"};
        } catch (error) {
            return handleAPIError(error);
        }
    };

    //login user
    const loginUser = async (userData) => {
        setError("");
        try {
            const response = await apiClient.post('/api/v1/auth/jwt/create/', userData);
            setAuthTokens(response.data);
            localStorage.setItem('authTokens', JSON.stringify(response.data));

           const profile = await fetchUserProfile(response.data);
           if(profile){
               setUser(profile);

           }

        return {success:true};
        } catch (error) {
            const msg = error.response?.data.detail || "Login failed ! Please check your credentials and try again.";
            setError(msg);
            return {success: false, message: msg};
        }
    };

    // register user
    const registerUser = async (userData) => {
        setError("");
        try {
            await apiClient.post('/api/v1/auth/users/', userData);
            return {success: true, message: "Registration successful ! Please login to continue."};
        } catch (error) {
            return handleAPIError(error, "Registration failed ! Please check your details and try again.");
        }
    };


    return {
        user,
        error,
        loading,
        loginUser,
        registerUser,
        logoutUser,
        updateUserProfile,
        changePassword,
        authTokens
    };
};

export default useAuth;