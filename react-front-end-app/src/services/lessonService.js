import apiClient from "@/config/axiosConfig";

// handles fetching/managing lesson data from the API 

export function getAllLessons() {
    return apiClient.get('/lessons');
}

export function getLessonById(id) {
    return apiClient.get(`/lessons/${id}`);
}

export function completeLesson(lessonId) {
    return apiClient.post(`/lessons/${lessonId}/complete`)
}