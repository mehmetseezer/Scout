import React, { useState , useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // AuthContext'ten kimlik doğrulama fonksiyonlarını alın
import { toast } from 'react-toastify'; // Bildirimler için
import Navbar from '../components/Navbar'; // Navbar bileşeni
import Footer from '../components/Footer';

const Profile = () => {
    const { auth, onUpdateProfile } = useAuth();
    const [name, setName] = useState(auth?.user?.name || '');
    const [email, setEmail] = useState(auth?.user?.email || '');
    const [profilePhoto, setProfilePhoto] = useState(auth?.user?.profilePhoto || '');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = `Scout | ${auth.user.username}`;
    }, [auth]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await onUpdateProfile({ name, email, profilePhoto });
            toast.success('Profil bilgileri başarıyla güncellendi!');
        } catch (error) {
            toast.error('Profil güncellenirken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Profile Section */}
            <section className="flex-grow bg-gradient-to-r from-red-50 to-white py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Profilim</h2>

                        {/* Profile Photo */}
                        <div className="flex justify-center mb-8">
                            <div className="relative">
                                <img
                                    src={profilePhoto || 'https://picsum.photos/seed/picsum/150'}
                                    alt="Profil Fotoğrafı"
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                                />
                                <button
                                    onClick={() => {
                                        const newPhoto = prompt('Yeni profil fotoğrafı URL\'sini girin:');
                                        if (newPhoto) setProfilePhoto(newPhoto);
                                    }}
                                    className="absolute bottom-0 right-0 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-300"
                                >
                                    ✏️
                                </button>
                            </div>
                        </div>

                        {/* Profile Form */}
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

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                {loading ? 'Güncelleniyor...' : 'Profili Güncelle'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Profile;