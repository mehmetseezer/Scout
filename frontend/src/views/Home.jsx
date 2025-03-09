import React, { useEffect, useState, useRef, useCallback } from 'react';
import { SiNanostores } from "react-icons/si";
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogCard from '../components/BlogCard';
import blogService from '../services/blog.service';
import PopularTagsSlider from '../components/PopularTagsSlider';
import BlogFilters from '../components/BlogFilters';

const Home = () => {
    const [searchParams] = useSearchParams();
    const tagFromUrl = searchParams.get('tag');
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [topTags, setTopTags] = useState([]);
    const [filters, setFilters] = useState({
        sortBy: 'newest',
        readTime: [0, 60],
        search: '',
        tag: tagFromUrl || '',
    });

    useEffect(() => {
        document.title = "Scout | Anasayfa";
    }, []);

    useEffect(() => {
        const fetchTopTags = async () => {
            try {
                const response = await blogService.getTopTags();
                setTopTags(response.top_tags);
            } catch (error) {
                console.error("En çok kullanılan etiketler alınamadı:", error);
            }
        };

        fetchTopTags();
    }, []);

    const observer = useRef(null);
    const lastBlogElementRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    const fetchBlogs = async (page, filters, reset = false) => {
        try {
            setLoading(true);
            const data = await blogService.listBlogs({ ...filters, page });

            if (data.blogs.length === 0) {
                setHasMore(false);
            } else {
                setBlogs((prevBlogs) => {
                    if (reset) {
                        return data.blogs;
                    } else {
                        const newBlogs = data.blogs.filter(
                            (newBlog) => !prevBlogs.some((existingBlog) => existingBlog.id === newBlog.id)
                        );
                        return [...prevBlogs, ...newBlogs];
                    }
                });
            }
        } catch (error) {
            console.error("Blogları çekerken hata oluştu:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs(page, filters);
    }, [page]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleReadTimeChange = (values) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            readTime: values
        }));
    };

    const applyFilters = () => {
        setPage(1);
        setBlogs([]);
        setHasMore(true);
        fetchBlogs(1, filters, true);
    };

    const onTagClick = (tag) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            tag: tag
        }));
    
        setPage(1);
        setBlogs([]);
        setHasMore(true);
        fetchBlogs(1, { ...filters, tag }, true);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-grow">
                <div className="container mx-auto px-6 py-12 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        <div className="lg:col-span-3">
                            {/* Popüler Etiketler */}
                            <div className="flex overflow-auto items-center justify-center gap-2">
                                {topTags.length > 0 && 
                                <PopularTagsSlider topTags={topTags} onTagClick={onTagClick} />
                                }
                            </div>
                            {/* Blog Listesi */}
                            <div className="flex flex-col gap-6">
                                {blogs.length > 0 ? (
                                    blogs.map((blog, index) => {
                                        if (blogs.length === index + 1) {
                                            return (
                                                <div ref={lastBlogElementRef} key={blog.id}>
                                                    <BlogCard blog={blog} />
                                                </div>
                                            );
                                        } else {
                                            return <BlogCard key={blog.id} blog={blog} />;
                                        }
                                    })
                                ) : (
                                    !loading && (
                                        <div className="w-full h-full flex items-center justify-center flex-col gap-8">
                                            <SiNanostores className="w-64 h-64 text-gray-500" />
                                        </div>
                                    )
                                )}
                            </div>

                            {loading && (
                                <div className="flex justify-center my-6">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                                </div>
                            )}
                        </div>

                        {/* Filtreler */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 sticky top-32">
                                <BlogFilters 
                                    tempFilters={filters}
                                    handleFilterChange={handleFilterChange}
                                    handleReadTimeChange={handleReadTimeChange}
                                    applyFilters={applyFilters}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Home;