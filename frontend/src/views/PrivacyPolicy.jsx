import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
  
        {/* Ana İçerik */}
        <main className="flex-grow container mx-auto px-6 py-12 max-w-7xl">
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
            {/* Başlık */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Gizlilik Politikası</h1>
              <p className="text-gray-600">Son güncelleme: 18 Şubat 2025</p>
            </div>
  
            {/* Giriş */}
            <div className="mb-8">
              <p className="text-gray-700 mb-4">
                Bu Gizlilik Politikası, hizmetimizi kullandığınızda bilgilerinizin toplanması, kullanılması ve ifşa edilmesine ilişkin politikalarımızı ve prosedürlerimizi açıklar ve gizlilik haklarınız ile yasanın sizi nasıl koruduğu hakkında bilgi verir.
              </p>
              <p className="text-gray-700">
                Kişisel verilerinizi hizmeti sağlamak ve iyileştirmek için kullanıyoruz. Hizmeti kullanarak, bilgilerinizin bu Gizlilik Politikası'na uygun şekilde toplanmasını ve kullanılmasını kabul etmiş olursunuz. Bu Gizlilik Politikası,{" "}
                <a
                  href="https://www.freeprivacypolicy.com/free-privacy-policy-generator/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Ücretsiz Gizlilik Politikası Oluşturucu
                </a>{" "}
                yardımıyla oluşturulmuştur.
              </p>
            </div>
  
            {/* Yorumlama ve Tanımlar */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Yorumlama ve Tanımlar</h2>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Yorumlama</h3>
              <p className="text-gray-700 mb-4">
                Baş harfi büyük yazılan kelimeler, aşağıdaki koşullar altında tanımlanmış anlamlara sahiptir. Aşağıdaki tanımlar, tekil veya çoğul olarak görünmelerine bakılmaksızın aynı anlama sahip olacaktır.
              </p>
  
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tanımlar</h3>
              <p className="text-gray-700 mb-4">Bu Gizlilik Politikası için:</p>
              <ul className="list-disc pl-8 mb-4">
                <li className="mb-2">
                  <strong>Hesap</strong>, hizmetimize veya hizmetimizin bir bölümüne erişmek için oluşturulan benzersiz bir hesap anlamına gelir.
                </li>
                <li className="mb-2">
                  <strong>Bağlı Kuruluş</strong>, bir tarafın kontrol ettiği, kontrol edildiği veya bir taraf ile ortak kontrol altında bulunan bir varlık anlamına gelir; burada "kontrol", yönetim kurulu veya diğer yönetim organlarının seçimi için oy kullanma hakkına sahip hisselerin, özsermaye menfaatinin veya diğer menkul kıymetlerin %50 veya daha fazlasının mülkiyetini ifade eder.
                </li>
                <li className="mb-2">
                  <strong>Şirket</strong> (bu Sözleşme'de "Şirket", "Biz", "Bizim" veya "Bizim" olarak anılacaktır), Scout'u ifade eder.
                </li>
                <li className="mb-2">
                  <strong>Çerezler</strong>, bir web sitesi tarafından bilgisayarınıza, mobil cihazınıza veya başka bir cihaza yerleştirilen ve web sitesindeki gezinme geçmişinizin ayrıntılarını içeren küçük dosyalardır.
                </li>
                <li className="mb-2">
                  <strong>Ülke</strong>, Türkiye'yi ifade eder.
                </li>
                <li className="mb-2">
                  <strong>Cihaz</strong>, bilgisayar, cep telefonu veya dijital tablet gibi hizmete erişebilen herhangi bir cihaz anlamına gelir.
                </li>
                <li className="mb-2">
                  <strong>Kişisel Veri</strong>, tanımlanmış veya tanımlanabilir bir bireyle ilgili herhangi bir bilgi anlamına gelir.
                </li>
                <li className="mb-2">
                  <strong>Hizmet</strong>, Web Sitesi'ni ifade eder.
                </li>
                <li className="mb-2">
                  <strong>Hizmet Sağlayıcı</strong>, verileri Şirket adına işleyen herhangi bir gerçek veya tüzel kişi anlamına gelir. Şirket tarafından hizmeti kolaylaştırmak, hizmeti Şirket adına sağlamak, hizmetle ilgili hizmetler gerçekleştirmek veya hizmetin nasıl kullanıldığını analiz etmeye yardımcı olmak için istihdam edilen üçüncü taraf şirketler veya bireyleri ifade eder.
                </li>
                <li className="mb-2">
                  <strong>Kullanım Verileri</strong>, hizmetin kullanımı tarafından otomatik olarak toplanan veya hizmet altyapısının kendisi tarafından oluşturulan verileri ifade eder (örneğin, bir sayfanın ziyaret süresi).
                </li>
                <li className="mb-2">
                  <strong>Web Sitesi</strong>,{" "}
                  <a
                    href="https://www.scout.com"
                    rel="external nofollow noopener"
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    https://www.scout.com
                  </a>{" "}
                  adresinden erişilebilen Scout'u ifade eder.
                </li>
                <li className="mb-2">
                  <strong>Siz</strong>, hizmete erişen veya kullanan birey veya bu birey adına hizmete erişen veya kullanan şirket veya diğer tüzel kişi anlamına gelir.
                </li>
              </ul>
            </div>
  
            {/* Diğer bölümler buraya eklenebilir */}
          </div>
        </main>
  
        <Footer />
      </div>
    );
  };
  
  export default PrivacyPolicy;