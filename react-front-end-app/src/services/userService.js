import apiClient from "@/config/axiosConfig";

// handles fetching authenticated user profile details

export const getUser = () => {
    return apiClient.get('/users/me');
}

export const deleteUser = () => {
    return apiClient.delete('/users')
}