import apiClient from "@/config/axiosConfig";

// handles fetching reward data for the dashboard

export function getEarnedRewards() {
    return apiClient.get('/rewards')
}

export function getAllRewards() {
    return apiClient.get('/rewards/all')
}