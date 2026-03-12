import apiClient from "@/config/axiosConfig";

export function getAllSongs() {
    return apiClient.get('/songs');
}

export function getSongById(id) {
    return apiClient.get(`/songs/${id}`);
}