import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Terms = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Ana İçerik */}
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Başlık */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Kullanım Koşulları</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Lütfen hizmetimizi kullanmadan önce bu Kullanım Koşullarını dikkatlice okuyun.
            </p>
          </div>

          {/* İçerik */}
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Kullanım Koşulları</h2>
            <p className="text-gray-600 mb-4">Son güncelleme: 18 Şubat 2025</p>
            <p className="text-gray-600 mb-6">
              Lütfen hizmetimizi kullanmadan önce bu Kullanım Koşullarını dikkatlice okuyun.
            </p>

            <h2 className="text-xl font-bold text-gray-900 mb-4">Yorumlama ve Tanımlar</h2>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Yorumlama</h3>
            <p className="text-gray-600 mb-4">
              Baş harfi büyük yazılan kelimeler, aşağıdaki koşullar altında tanımlanmış anlamlara sahiptir. Aşağıdaki tanımlar, tekil veya çoğul olarak görünmelerine bakılmaksızın aynı anlama sahip olacaktır.
            </p>

            <h3 className="text-lg font-bold text-gray-900 mb-2">Tanımlar</h3>
            <p className="text-gray-600 mb-4">Bu Kullanım Koşulları için:</p>
            <ul className="list-disc pl-8 mb-6">
              <li className="mb-2">
                <strong>Bağlı Kuruluş</strong>, bir tarafın kontrol ettiği, kontrol edildiği veya bir taraf ile ortak kontrol altında bulunan bir varlık anlamına gelir; burada "kontrol", yönetim kurulu veya diğer yönetim organlarının seçimi için oy kullanma hakkına sahip hisselerin, özsermaye menfaatinin veya diğer menkul kıymetlerin %50 veya daha fazlasının mülkiyetini ifade eder.
              </li>
              <li className="mb-2">
                <strong>Ülke</strong>, Türkiye'yi ifade eder.
              </li>
              <li className="mb-2">
                <strong>Şirket</strong> (bu Sözleşme'de "Şirket", "Biz", "Bizim" veya "Bizim" olarak anılacaktır), Scout'u ifade eder.
              </li>
              <li className="mb-2">
                <strong>Cihaz</strong>, bilgisayar, cep telefonu veya dijital tablet gibi hizmete erişebilen herhangi bir cihaz anlamına gelir.
              </li>
              <li className="mb-2">
                <strong>Hizmet</strong>, Web Sitesi'ni ifade eder.
              </li>
              <li className="mb-2">
                <strong>Kullanım Koşulları</strong> (ayrıca "Koşullar" olarak anılacaktır), hizmetin kullanımı ile ilgili Siz ve Şirket arasındaki tüm anlaşmayı oluşturan bu Kullanım Koşullarını ifade eder. Bu Kullanım Koşulları, <a href="https://www.freeprivacypolicy.com/free-terms-and-conditions-generator/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Ücretsiz Kullanım Koşulları Oluşturucu</a> yardımıyla oluşturulmuştur.
              </li>
              <li className="mb-2">
                <strong>Üçüncü Taraf Sosyal Medya Hizmeti</strong>, hizmet tarafından görüntülenebilen, dahil edilebilen veya kullanıma sunulan üçüncü bir taraf tarafından sağlanan herhangi bir hizmet veya içerik (veri, bilgi, ürün veya hizmetler dahil) anlamına gelir.
              </li>
              <li className="mb-2">
                <strong>Web Sitesi</strong>, <a href="http://www.scout.com" rel="external nofollow noopener" target="_blank" className="text-blue-500 hover:underline">http://www.scout.com</a> adresinden erişilebilen Scout'u ifade eder.
              </li>
              <li className="mb-2">
                <strong>Siz</strong>, hizmete erişen veya kullanan birey veya bu birey adına hizmete erişen veya kullanan şirket veya diğer tüzel kişi anlamına gelir.
              </li>
            </ul>

            {/* Diğer bölümler buraya eklenebilir */}
            <h2 className="text-xl font-bold text-gray-900 mb-4">Bilgilendirme</h2>
            <p className="text-gray-600 mb-4">
              Bunlar, hizmetin kullanımını düzenleyen ve Siz ile Şirket arasında yürürlükte olan Kullanım Koşullarıdır. Bu Kullanım Koşulları, tüm kullanıcıların hizmetin kullanımı ile ilgili haklarını ve yükümlülüklerini belirler.
            </p>
            <p className="text-gray-600 mb-4">
              Hizmete erişiminiz ve kullanımınız, bu Kullanım Koşullarını kabul etmenize ve bunlara uymanıza bağlıdır. Bu Kullanım Koşulları, hizmete erişen veya kullanan tüm ziyaretçiler, kullanıcılar ve diğer kişiler için geçerlidir.
            </p>
            <p className="text-gray-600 mb-6">
              Hizmete erişerek veya kullanarak, bu Kullanım Koşullarına bağlı kalacağınızı kabul etmiş olursunuz. Bu Kullanım Koşullarının herhangi bir bölümüne katılmıyorsanız, hizmete erişemezsiniz.
            </p>

            {/* İletişim Bilgileri */}
            <h2 className="text-xl font-bold text-gray-900 mb-4">Bize Ulaşın</h2>
            <p className="text-gray-600 mb-4">
              Bu Kullanım Koşulları hakkında herhangi bir sorunuz varsa, bize aşağıdaki adresten ulaşabilirsiniz:
            </p>
            <ul className="list-disc pl-8 mb-6">
              <li className="text-gray-600">E-posta: mehmetszr@scout.com</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;