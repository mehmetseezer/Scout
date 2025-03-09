import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // AuthContext'ten kimlik doğrulama fonksiyonlarını alın
import { toast } from 'react-toastify'; // Bildirimler için
import Navbar from '../components/Navbar'; // Navbar bileşeni
import Footer from '../components/Footer'; // Footer bileşeni

const Register = () => {
    const { onRegister } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = `Scout | Kayıt Ol`;
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await onRegister(name, email, password);
            toast.success('Başarıyla kayıt olundu!');
        } catch (error) {
            toast.error('Kayıt olurken bir hata oluştu. Lütfen bilgilerinizi kontrol edin.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Register Form */}
            <section className="flex-grow bg-gradient-to-r from-red-50 to-white py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Kayıt Ol</h2>
                        <form onSubmit={handleSubmit}>
                            {/* Name Input */}
                            <div className="mb-6">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Adınız
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="Adınızı girin"
                                    required
                                />
                            </div>

                            {/* Email Input */}
                            <div className="mb-6">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    E-posta
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="E-postanızı girin"
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
                                {loading ? 'Kayıt Olunuyor...' : 'Kayıt Ol'}
                            </button>
                        </form>

                        {/* Additional Links */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Zaten hesabınız var mı?{' '}
                                <Link
                                    to="/login"
                                    className="text-red-500 hover:text-red-600"
                                >
                                    Giriş Yap
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

export default Register;