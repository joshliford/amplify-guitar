import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8080/api"
})

apiClient.interceptors.request.use(
    config => {
        if (!config.url?.includes('/login') && !config.url?.includes('/register')) {
            const token = sessionStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    error => Promise.reject(error)
);

apiClient.interceptors.response.use(
    // since axios only returns successful responses, just return the response
    response => response,
    error => {
        if (error.response?.status === 401) {
            sessionStorage.clear();
            window.location.href = '/login';
        }
        // pass error down so components can handle specific error messages
        return Promise.reject(error);
    }
);

export default apiClient;
