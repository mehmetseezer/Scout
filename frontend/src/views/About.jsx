import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaUsers, FaLightbulb, FaHandshake } from "react-icons/fa";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Ana İçerik */}
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Başlık */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Hakkımızda</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Scout olarak, teknoloji ve inovasyonun gücüyle dünyayı daha iyi bir yer haline getirmek için çalışıyoruz.
            </p>
          </div>

          {/* Misyon, Vizyon ve Değerler */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Misyon */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center">
              <div className="flex justify-center mb-4">
                <FaUsers className="text-red-600 text-4xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Misyonumuz</h2>
              <p className="text-gray-600">
                Müşterilerimize en kaliteli ürün ve hizmetleri sunarak, onların başarısına katkıda bulunmak.
              </p>
            </div>

            {/* Vizyon */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center">
              <div className="flex justify-center mb-4">
                <FaLightbulb className="text-red-600 text-4xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Vizyonumuz</h2>
              <p className="text-gray-600">
                Teknolojinin sınırlarını zorlayarak, dünya çapında bir marka olmak.
              </p>
            </div>

            {/* Değerler */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center">
              <div className="flex justify-center mb-4">
                <FaHandshake className="text-red-600 text-4xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Değerlerimiz</h2>
              <p className="text-gray-600">
                Şeffaflık, dürüstlük ve müşteri memnuniyeti bizim için her zaman ön plandadır.
              </p>
            </div>
          </div>

          {/* Ekibimiz */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ekibimiz</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Alanında uzman ve deneyimli ekibimizle, her zaman en iyisini sunmak için çalışıyoruz.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Ekip Üyesi 1 */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Ekip Üyesi 1"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ahmet Yılmaz</h3>
                <p className="text-gray-600">CEO & Kurucu</p>
              </div>

              {/* Ekip Üyesi 2 */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Ekip Üyesi 2"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Ayşe Demir</h3>
                <p className="text-gray-600">CTO</p>
              </div>

              {/* Ekip Üyesi 3 */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 text-center">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Ekip Üyesi 3"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Mehmet Kaya</h3>
                <p className="text-gray-600">Pazarlama Müdürü</p>
              </div>
            </div>
          </div>

          {/* Şirket Tarihçesi */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Şirket Tarihçesi</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              2010 yılında küçük bir ekip ve büyük bir hayalle yola çıktık. Bugün, dünya çapında binlerce müşteriye hizmet veren bir şirket haline geldik.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;