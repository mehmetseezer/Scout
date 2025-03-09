import React, { useState } from 'react';
import { FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';
import logo from '../../public/logo.svg';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
    const { auth, onLogout } = useAuth();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await onLogout();
            toast.success('Başarıyla çıkış yapıldı.');
        } catch (error) {
            toast.error('Çıkış yaparken bir hata meydana geldi!');
        }
    };

    return (
        <header className="sticky top-0 left-0 z-50 bg-white shadow-lg border-b border-gray-200">
            <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo - Wrapped in Link to go to Home */}
                <div className="flex items-center space-x-4">
                    <Link to="/" className="flex items-center space-x-2">
                        <img src={logo} alt="Brand" className="w-10 h-10" />
                        <h1 className="text-2xl font-semibold text-gray-900">Scout</h1>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden text-gray-900 z-50 text-2xl focus:outline-none"
                    onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Web Navigation Links */}
                <div className="hidden lg:flex items-center space-x-8">
                    {/* User Section */}
                    <div className="flex items-center space-x-4">
                        {auth?.user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center space-x-2 text-gray-900 hover:text-red-500 transition"
                                >
                                    {auth.user.profilePhoto ? (
                                        <img
                                            src={auth.user.profilePhoto}
                                            alt={auth.user.username}
                                            className="w-10 h-10 border-4 border-gray-200 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full flex items-center border-gray-200 border-2 justify-center">
                                            <FiUser className="text-xl text-gray-300" />
                                        </div>
                                    )}
                                    <span className="hidden sm:block font-medium">{auth.user.username}</span>
                                    <FaChevronDown
                                        className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                {/* Dropdown Menu for Desktop */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                                        <Link
                                            to="/tools"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 transition"
                                        >
                                            Araçlarım
                                        </Link>
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 transition"
                                        >
                                            Profilim
                                        </Link>
                                        {auth?.user?.roles?.includes('admin') && (
                                            <Link
                                                to="/admin-panel"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 transition"
                                            >
                                                Admin Panele Git
                                            </Link>
                                        )}
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 transition"
                                        >
                                            Çıkış Yap
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-6 py-2 rounded-full text-white bg-red-500 hover:bg-red-600 transition shadow-md hover:shadow-lg"
                                >
                                    Giriş Yap
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-6 py-2 rounded-full text-white bg-red-500 hover:bg-red-600 transition shadow-md hover:shadow-lg"
                                >
                                    Kayıt Ol
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`lg:hidden fixed inset-0 h-screen w-full bg-white flex flex-col items-center justify-start gap-8 px-6 py-8 transition-transform transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    {/* Mobile User Section */}
                    <div className="flex flex-col items-center space-y-4">
                        {auth?.user ? (
                            <>
                                <div className="relative flex flex-col items-center space-y-2">
                                    {auth.user.profilePhoto ? (
                                        <img
                                            src={auth.user.profilePhoto}
                                            alt={auth.user.username}
                                            className="w-16 h-16 border-4 border-gray-200 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center border-gray-200 border-4 justify-center">
                                            <FiUser className="text-red-500 text-lg" />
                                        </div>
                                    )}
                                    <span className="text-gray-900 font-medium">{auth.user.username}</span>
                                </div>

                                {/* Direct Links for Mobile */}
                                <div className="w-full flex flex-col items-center space-y-4">
                                    <Link
                                        to="/tools"
                                        className="block w-full px-6 py-3 text-sm text-gray-900 bg-gray-100 hover:bg-gray-200 text-center rounded-lg transition"
                                    >
                                        Araçlarım
                                    </Link>
                                    <Link
                                        to="/profile"
                                        className="block w-full px-6 py-3 text-sm text-gray-900 bg-gray-100 hover:bg-gray-200 text-center rounded-lg transition"
                                    >
                                        Profilim
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full px-6 py-3 text-sm text-gray-900 bg-gray-100 hover:bg-gray-200 text-center rounded-lg transition"
                                    >
                                        Çıkış Yap
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="block w-full px-6 py-3 text-sm text-white bg-red-500 hover:bg-red-600 text-center rounded-lg shadow-md hover:shadow-lg transition"
                                >
                                    Giriş Yap
                                </Link>
                                <Link
                                    to="/register"
                                    className="block w-full px-6 py-3 text-sm text-white bg-red-500 hover:bg-red-600 text-center rounded-lg shadow-md hover:shadow-lg transition"
                                >
                                    Kayıt Ol
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;