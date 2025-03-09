import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
    const { onLogin } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Scout | Giriş";
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await onLogin(username, password);
            toast.success('Başarıyla giriş yapıldı!');
            const redirectPath = location.state?.from || '/';
            navigate(redirectPath);
        } catch (error) {
            toast.error('Giriş yaparken bir hata oluştu. Lütfen bilgilerinizi kontrol edin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Login Form */}
            <section className="flex-grow bg-gradient-to-r from-red-50 to-white py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Giriş Yap</h2>
                        <form onSubmit={handleSubmit}>
                            {/* Username Input */}
                            <div className="mb-6">
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                    Kullanıcı Adı
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="Kullanıcı adınızı girin"
                                    required
                                />
                            </div>

                            {/* Password Input */}
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Şifre
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="Şifrenizi girin"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
                            </button>
                        </form>

                        {/* Additional Links */}
                        <div className="mt-6 text-center">
                            <Link
                                to="/forgot-password"
                                className="text-sm text-red-500 hover:text-red-600"
                            >
                                Şifremi Unuttum
                            </Link>
                            <p className="mt-4 text-sm text-gray-600">
                                Hesabınız yok mu?{' '}
                                <Link
                                    to="/register"
                                    className="text-red-500 hover:text-red-600"
                                >
                                    Kayıt Ol
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Login;