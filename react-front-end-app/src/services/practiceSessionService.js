import apiClient from "@/config/axiosConfig";

// handles fetching/managing practice session data

export function startSession(goalId) {
    // pass goalId in request body since backend is expecting JSON body
    return apiClient.post('/practice-sessions', { goalId });
}

export function endSession(sessionId, notes) {
    // pass notes in request body since backend is expecting JSON body
    return apiClient.patch(`/practice-sessions/${sessionId}`, { notes })
}

export function getTotalPracticeTime() {
    return apiClient.get('/practice-sessions/total-time');
}