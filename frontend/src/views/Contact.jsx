import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Ana İçerik */}
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Başlık */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">İletişim</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sorularınız, önerileriniz veya geri bildirimleriniz için bize ulaşın. Ekibimiz en kısa sürede sizinle iletişime geçecektir.
            </p>
          </div>

          {/* İletişim Bilgileri ve Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* İletişim Bilgileri */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">İletişim Bilgileri</h2>

              {/* Adres */}
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-red-50 rounded-full">
                  <FaMapMarkerAlt className="text-red-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Adres</h3>
                  <p className="text-gray-600">1234 Sokak, No: 56, İstanbul, Türkiye</p>
                </div>
              </div>

              {/* Telefon */}
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-red-50 rounded-full">
                  <FaPhoneAlt className="text-red-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Telefon</h3>
                  <p className="text-gray-600">+90 555 123 45 67</p>
                </div>
              </div>

              {/* E-posta */}
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-red-50 rounded-full">
                  <FaEnvelope className="text-red-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">E-posta</h3>
                  <p className="text-gray-600">info@scout.com</p>
                </div>
              </div>
            </div>

            {/* İletişim Formu */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Bize Mesaj Gönderin</h2>
              <form>
                {/* İsim */}
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    İsim
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Adınızı girin"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                {/* E-posta */}
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="E-posta adresinizi girin"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                {/* Konu */}
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Konu
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Konu başlığını girin"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                {/* Mesaj */}
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mesaj
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Mesajınızı buraya yazın"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  ></textarea>
                </div>

                {/* Gönder Butonu */}
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Gönder
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;