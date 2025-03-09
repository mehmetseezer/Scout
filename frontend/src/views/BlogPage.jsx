import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiTag } from 'react-icons/fi';
import { BsBookmark, BsOctagonFill } from 'react-icons/bs'; // Alkış ikonu için BsHandThumbsUp eklendi
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import blogService from '../services/blog.service';
import formatDate from '../helpers/formatDate';
import { useNavigate } from 'react-router-dom';

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleTagClick = (tag) => {
    navigate(`/?tag=${encodeURIComponent(tag)}`)
  }

  useEffect(() => {
    if (blog) {
      document.title = blog.title;
    }
  }, [blog]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await blogService.getBlog(id);
        setBlog(data);
      } catch (err) {
        console.error("Blog içeriği çekerken hata oluştu:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog Bulunamadı</h1>
        <p className="text-lg text-gray-600 mb-8">
          Aradığınız blog yazısı mevcut değil veya bir hata oluştu.
        </p>
        <div className="flex space-x-4">
          <a
            href="/"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          >
            Ana Sayfaya Dön
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <div className="container mx-auto px-6 py-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="flex items-center mb-8">
                  <img
                    className="w-12 h-12 rounded-full cursor-pointer"
                    src={blog.author_image}
                    alt={blog.author_name}
                  />
                  <div className="ml-4 border-b-2 border-b-gray-300 rounded-b-2xl pb-4">
                    <p className="text-lg font-medium text-gray-900 cursor-pointer hover:underline">{blog.author_name}</p>
                    <p className="text-sm text-gray-500 cursor-pointer">{blog.author_username}</p>
                    <div className='flex items-center justify-between gap-4'>
                    <p className="text-sm text-slate-500 gap-4">{blog.read_time} dakika okuma süresi</p>
                    <BsOctagonFill className='text-xs text-slate-500 font-extralight'/>
                    <p className="text-sm text-slate-500">{formatDate(blog.date)}</p>
                    </div>
                  </div>
                </div>
                <div className="prose max-w-none" id="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }}>
                </div>
                <div className="mt-8">
                  <div className="flex flex-wrap">
                    {blog.tags.map((tag, index) => (
                      <span onClick={() => handleTagClick(tag)} key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full mr-2 mb-2 cursor-pointer">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 sticky top-32">
                <div className="flex items-center gap-2 mb-4">
                  <BsBookmark className="text-red-500 text-xl" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Popüler Etiketler
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Teknoloji", "Yazılım", "Startup", "AI", "Tasarım", "Seyahat", "Bilim", "Kariyer"].map((tag) => (
                    <a
                      href={`/tag/${tag.toLowerCase()}`}
                      key={tag}
                      className="px-3 py-1.5 bg-red-50 text-red-700 rounded-full text-sm flex items-center
                                          hover:bg-red-100 transition-colors duration-200"
                    >
                      <FiTag className="mr-1.5" />
                      {tag}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;