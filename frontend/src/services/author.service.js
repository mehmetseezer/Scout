import api from '../api/api';

const authorService = {
    // Blog arama işlemi
    getAuthorDetail: async (username) => {
        return (await api.get(`/authors/author_detail/?username=${username}`)).data;
    },
    scrape_authors: async (usernames) => {
        return (await api.post(`/authors/scrape_authors/`, { usernames: usernames }));
    },
    get_queue: async () => {
        return (await api.get('/authors/get_queue_details/'));
    },
};

export default authorService;