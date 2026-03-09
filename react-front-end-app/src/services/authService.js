import apiClient from "@/config/axiosConfig";

// handle login and register API calls
// uses apiClient from axiosConfig which automatically attaches JWT token to requests

export const requestLogin = authRequest => {
    return apiClient.post('/auth/login', authRequest);
}

export const requestRegistration = userProfile => {
    return apiClient.post('/auth/register', userProfile);
}