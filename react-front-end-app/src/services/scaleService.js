import apiClient from "@/config/axiosConfig";

// handles fetching scale data from the API

export function getAllScales() {
    return apiClient.get('/scales');
}

export function getAllScalesByDifficulty(difficulty) {
    return apiClient.get(`/scales/difficulty/${difficulty}`);
}

export function getScaleById(id) {
    return apiClient.get(`/scales/${id}`);
}

export function getTotalScales() {
    return apiClient.get('/scales/count');
}