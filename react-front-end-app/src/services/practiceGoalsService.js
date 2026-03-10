import apiClient from "@/config/axiosConfig";

// handles fetching practice goal data

export function getAllGoals() {
    return apiClient.get('/goals')
}