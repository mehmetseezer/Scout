import api from '../api/api';

const blogService = {
    // Tüm blogları sayfalandırılmış şekilde getir
    listBlogs: async (filters = {}) => {
        return (await api.get('/blogs/list_blogs/', {
            params: {
                page: filters.page ? filters.page : 1,
                page_size: filters.pageSize ? filters.pageSize : 10,
                sortBy: filters.sortBy || 'newest', // Varsayılan sıralama
                readTime_min: filters.readTime ? filters.readTime[0] : 0, // Okuma süresi minimum değeri
                readTime_max: filters.readTime ? filters.readTime[1] : 60, // Okuma süresi maksimum değeri
                tag: filters.tag || '', // Etiket filtresi
                search: filters.search || '', // Arama filtresi
            }
        })).data;
    },

    // Blog arama işlemi
    searchBlogs: async (query) => {
        return (await api.post('/blogs/search_blog/', { query })).data;
    },

    // Yeni bir blog oluştur
    createBlog: async (blogData) => {
        return (await api.post('/blogs/', blogData)).data;
    },

    // Belirli bir blogu getir
    getBlog: async (blogId) => {
        return (await api.get(`/blogs/get_blog/?id=${blogId}`)).data;
    },

    // Bir blogu güncelle
    updateBlog: async (blogId, blogData) => {
        return (await api.put(`/blogs/${blogId}/`, blogData)).data;
    },

    // Bir blogu sil
    deleteBlog: async (blogId) => {
        return (await api.delete(`/blogs/${blogId}/`)).data;
    },

    // En çok kullanılan 10 etiketi getir
    getTopTags: async () => {
        return (await api.get('/blogs/top_tags/')).data;
    }
};

export default blogService;
