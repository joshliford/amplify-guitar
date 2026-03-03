import apiClient from "@/config/axiosConfig"

// handles fetching chord data from the API

export function getAllChords() {
    return apiClient.get('/chords');
}

export function getChordsByDifficulty(difficulty) {
    return apiClient.get(`/chords/difficulty/${difficulty}`);
}

export function getChordById(id) {
    return apiClient.get(`/chords/${id}`);
}