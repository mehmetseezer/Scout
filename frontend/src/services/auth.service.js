import api from '../api/api';

const authService = {
    login: async (username, password) => {
        return (await api.post('/auth/login/', { username, password })).data;
    },

    logout: async (refreshToken) => {
        return (await api.post('/auth/logout', { refreshToken })).data;
    },

    register: async (name, email, password, phone) => {
        return (await api.post('/auth/register/'), { name, email, password, phone }).data;
    },

    refreshTokens: async (refreshToken) => {
        return (await api.post('/auth/refresh', { refreshToken })).data;
    },

    test: async () => {
        return (await api.post('/auth/test')).data;
    }
};

export default authService;
