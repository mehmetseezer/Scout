# Scout - Medium İçerik Keşif Platformu

![Scout Logo](logo.svg)  
![Django](https://img.shields.io/badge/Django-092E20?logo=django&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Elasticsearch](https://img.shields.io/badge/Elasticsearch-005571?logo=elasticsearch&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![Celery](https://img.shields.io/badge/Celery-37814A?logo=celery&logoColor=white)

**Scout**, Medium kullanıcılarının blog verilerini otomatik olarak toplayıp analiz eden, mikroservis tabanlı bir veri platformudur. Gerçek zamanlı işlem yetenekleri ve Türkçe dil desteğiyle gelişmiş arama deneyimi sunar.

---

## 📸 Ekran Görüntüleri

| Admin Paneli | Arama Sonuçları |
|--------------|-----------------|
| ![Admin](admin-preview.png) | ![Search](search-preview.png) |

---

## 🚀 Nasıl Kullanılır?

### 1. Sistem Başlatma
```bash
# Tüm servisleri ayağa kaldır
docker-compose up --build -d

# Servis durumunu kontrol et
docker-compose ps
```

### 2. Yönetici Paneli Erişimi
URL: http://localhost:8000/admin

Varsayılan Kullanıcı: root

Şifre: root

## ⚡ API Kullanımı

Scout platformu, Medium kullanıcı ve blog verilerine erişim sağlayan RESTful API'ler sunar. Tüm endpoint'ler JWT tabanlı kimlik doğrulama gerektirir.

---

## 🔐 Kimlik Doğrulama

### Token Alma
```http
POST /api/token/
Content-Type: application/json

{
  "username": "kullanici_adi",
  "password": "sifre"
}
```
### Respone
```json
{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
### Token Yenileme
```http
POST /api/token/refresh/
Content-Type: application/json

{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
### Respone
```json
{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 👤 Kullanıcı İşlemleri
### Kullanıcı Listesi
```http
GET /api/users/
Authorization: Bearer <access_token>
```
### Respone
```json
{
  "count": 1200,
  "results": [
    {
      "username": "kemal",
      "name": "Kemal Sunal",
      "followers": 15000,
      "blog_count": 45
    }
  ]
}
```
### Kullanıcı Listesi
```http
GET /api/users/{username}/
Authorization: Bearer <access_token>
```
### Respone
```json
{
  "username": "kemal",
  "name": "Kemal Sunal",
  "followers": 15000,
  "last_post_date": "2023-10-15",
  "total_read_time": 1200
}
```
## 📝 Blog İşlemleri
### Blog Arama
```http
GET /api/blogs/?q=django&author=kemal&min_read_time=5
Authorization: Bearer <access_token>
```
### Respone
```json
{
  "count": 15,
  "results": [
    {
      "title": "Django ile Yüksek Performans",
      "author": "kemal",
      "date": "2023-10-01",
      "read_time": 8,
      "content_preview": "Django ORM optimizasyon teknikleri..."
    }
  ]
}
```
### Blog Detayı
```http
GET /api/blogs/{id}/
Authorization: Bearer <access_token>
```
### Respone
```json
{
  "title": "Django ile Yüksek Performans",
  "author": {
    "username": "kemal",
    "name": "Kemal Sunal"
  },
  "content": "Django ORM optimizasyon teknikleri...",
  "date": "2023-10-01T12:00:00Z",
  "read_time": 8,
  "tags": ["django", "optimization"]
}
```

## 🧠 Kazanımlar
### Docker
Multi-Container Uygulama Yönetimi: Docker Compose ile mikroservis mimarisini öğrendim.

Healthcheck ve Dependency Management: Servislerin sağlık durumunu izleme ve bağımlılık yönetimi.

Volume Kullanımı: Veri kalıcılığı için volume'lerin nasıl kullanılacağını öğrendim.

### Celery
Task Queue Yönetimi: Farklı önceliklerde task kuyrukları oluşturmayı öğrendim.

Periodic Tasks: Zamanlanmış görevler için Celery Beat kullanımı.

Worker Scaling: Concurrent worker'lar ile performans optimizasyonu.

### 🔍 Elasticsearch
Full-Text Search: Türkçe dil desteği ile arama optimizasyonu.

Index Management: Veri indexleme ve yönetimi.

Bulk API: Toplu veri işleme ve performans artışı.

### 🧠 Redis
Cache Management: Veri önbellekleme ve performans artışı.

Pub/Sub Pattern: Gerçek zamanlı mesajlaşma ve event-driven mimari.

Atomic Operations: Thread-safe operasyonlar ve veri tutarlılığı.

### Eklenenler:
1. **Kazanımlar Bölümü**: Docker, Celery, Elasticsearch ve Redis ile ilgili öğrenilen detaylar eklendi.
2. **API Dokümantasyonu Genişletildi**: İstatistik ve yönetim endpoint'leri eklendi.
3. **Response Örnekleri**: Her endpoint için detaylı response örnekleri eklendi.
4. **Docker ve Celery Detayları**: Kazanımlar bölümünde bu teknolojilerle ilgili öğrenilen detaylar vurgulandı.