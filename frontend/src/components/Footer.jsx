import React from 'react';
import logo from '../../public/logo.svg'; // Logo importu
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaMedium } from 'react-icons/fa'; // react-icons'dan sosyal medya ikonları

const Footer = () => {
    return (
        <footer className="bg-white py-12 text-center text-gray-800">
            <hr className="border-t-2 border-gray-200 my-8 mx-auto w-3/4" /> {/* Yatay çizgi */}

            {/* Logo ve Metin */}
            <div className="flex justify-center mb-6 gap-2 items-center">
                <img src={logo} alt="Scout Logo" className="w-12 h-12" />
                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
                    Scout
                </h2>
            </div>

            {/* Sosyal Medya Bağlantıları */}
            <div className="mt-4 flex justify-center space-x-6">
                <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-red-500 transition-colors duration-300"
                >
                    <FaFacebookF size={24} /> {/* Facebook İkonu */}
                </a>
                <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-red-500 transition-colors duration-300"
                >
                    <FaTwitter size={24} /> {/* Twitter İkonu */}
                </a>
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-red-500 transition-colors duration-300"
                >
                    <FaInstagram size={24} /> {/* Instagram İkonu */}
                </a>
                <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-red-500 transition-colors duration-300"
                >
                    <FaLinkedin size={24} /> {/* LinkedIn İkonu */}
                </a>
                <a
                    href="https://medium.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-red-500 transition-colors duration-300"
                >
                    <FaMedium size={24} /> {/* Medium İkonu */}
                </a>
            </div>

            {/* Footer Linkler */}
            <div className="mt-6 flex justify-center space-x-6 flex-wrap">
                <a href="/privacy" className="text-gray-600 hover:text-red-500 transition-colors duration-300">
                    Gizlilik Politikası
                </a>
                <a href="/terms" className="text-gray-600 hover:text-red-500 transition-colors duration-300">
                    Kullanım Şartları
                </a>
                <a href="/contact" className="text-gray-600 hover:text-red-500 transition-colors duration-300">
                    İletişim
                </a>
                <a href="/about" className="text-gray-600 hover:text-red-500 transition-colors duration-300">
                    Hakkımızda
                </a>
            </div>

            {/* Ekstra Bilgi */}
            <div className="mt-8 text-sm text-gray-600">
                <p>
                    Scout, Medium platformundaki profilleri keşfetmenizi ve analiz etmenizi sağlayan yapay zeka destekli bir araçtır.
                </p>
                <p className="mt-2">
                    © {new Date().getFullYear()} Scout. Tüm hakları saklıdır.
                </p>
            </div>
        </footer>
    );
};

export default Footer;