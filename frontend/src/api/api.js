import axios from 'axios';
import { } from 'react-router-dom';

const baseURL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL,
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = JSON.parse(localStorage.getItem('site')).refresh;
            if (refreshToken) {
                try {
                    const response = await axios.post(`${baseURL}/auth/refresh/`, { refreshToken });
                    const newTokens = response.data;
                    localStorage.setItem('site', JSON.stringify(newTokens));
                    originalRequest.headers.Authorization = `Bearer ${newTokens.access.token}`;
                    return axios(originalRequest);
                } catch (error) {
                    localStorage.clear();
                    window.location.href('/login');
                }
            }
        }
        return Promise.reject(error);
    }
);


api.interceptors.request.use(
    (config) => {
        const tokenString = localStorage.getItem('site');
        if (tokenString) {
            const tokens = JSON.parse(tokenString);
            console.log(tokenString);
            console.log(tokens);
            console.log(tokens.access);
            config.headers.Authorization = `Bearer ${tokens.access}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
export default api;