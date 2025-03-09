import React, { useState } from "react";
import { FiUser, FiClock } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { BsOctagonFill } from "react-icons/bs";
import formatDate from "../helpers/formatDate";
import authorService from "../services/author.service";
import Tags from "./Tags";

const BlogCard = ({ blog }) => {
    const navigate = useNavigate();

    const [authorDetails, setAuthorDetails] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = () => {
        navigate(`/blogs/${blog.id}`);
    };

    const handleMouseEnter = async () => {
        setIsHovered(true);
        try {
            const data = await authorService.getAuthorDetail(blog.author_username);
            setAuthorDetails(data); // Yazar bilgilerini state'e kaydet
        } catch (error) {
            console.error("Author details fetch error:", error);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setAuthorDetails(null);
    };

    return (
        <div
            onClick={handleClick}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 h-60 relative"
        >
            <div className="h-full flex">
                {/* Sol Bölüm - İçerik */}
                <div className="w-5/6 p-6 flex flex-col justify-between">
                    <div>
                        <div
                            className="inline-flex items-center gap-3 mb-2 relative"
                            onMouseEnter={handleMouseEnter} // Mouse enter olayını ekle
                            onMouseLeave={handleMouseLeave} // Mouse leave olayını ekle
                        >
                            {blog.author_image ? (
                                <img
                                    src={blog.author_image}
                                    alt={blog.author_name}
                                    className="w-6 h-6 rounded-full object-cover cursor-pointer"
                                />
                            ) : (
                                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                                    <FiUser className="text-red-500 text-lg cursor-pointer" />
                                </div>
                            )}
                            <div>
                                <h4 className="font-sm text-gray-600 text-sm cursor-pointer hover:underline">
                                    {blog.author_name}
                                </h4>
                            </div>
                        </div>
                        <h3 className="text-2xl font-semibold pt-2 text-gray-900 line-clamp-2 cursor-pointer">
                            {blog.title}
                        </h3>
                        <p className="text-gray-600 line-clamp-2 text-sm mb-3 cursor-pointer">
                            {blog.description}
                        </p>
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center justify-between gap-4 text-xs text-slate-500">
                                {/* Okuma Süresi */}
                                <div className="flex items-center gap-1">
                                    <FiClock className="inline-block cursor-pointer" />
                                    <span>{blog.read_time} dk okuma süresi</span>
                                </div>
                                <BsOctagonFill className="text-xs font-extralight" />
                                {/* Tarih Formatı */}
                                <div className="flex items-center gap-1">
                                    <span>{formatDate(blog.date)}</span>
                                </div>
                            </div>
                            <Tags tags={blog.tags} maxVisibleTags={4} />
                        </div>
                    </div>
                </div>

                {/* Sağ Bölüm - Resim */}
                <div className="w-1/6 relative flex justify-center items-center cursor-pointer">
                    <img
                        src={blog.banner || "https://placehold.co/600x400"}
                        alt={blog.title}
                        className="w-32 h-32 object-cover rounded-3xl"
                    />
                </div>
            </div>

            {isHovered && authorDetails && (
                <div className="absolute top-16 left-6 bg-white shadow-md p-4 rounded-lg border border-gray-200 z-50">
                    <div className="flex items-center gap-2 mt-2">
                        <img
                            src={authorDetails.profile_image_url}
                            alt={authorDetails.name}
                            className="w-12 h-12 rounded-full border border-gray-300"
                        />
                        <div>
                            <p className="text-gray-700 font-medium">{authorDetails.name}</p>
                            <p className="text-sm text-gray-500">@{authorDetails.username}</p>
                        </div>
                    </div>
                    <p className="mt-2 italic">{authorDetails.followers} Takipçi</p>
                </div>
            )}
        </div>
    );
};

export default BlogCard;