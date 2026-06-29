# SlotMaster — Kurulum ve Kullanım Kılavuzu

## 📁 Proje Klasör Yapısı

```
slotmaster/
├── backend/                   ← Node.js/Express sunucu
│   ├── server.js              ← Ana sunucu, tüm middleware ve rotalar
│   ├── .env                   ← Hassas bilgiler (GİT'E YÜKLEMEyin!)
│   ├── routes/
│   │   ├── auth.js            ← Giriş, kayıt, şifre sıfırlama
│   │   ├── admin.js           ← Admin ayarları, popup, istatistik
│   │   ├── sponsors.js        ← Sponsor CRUD + tıklama loglama
│   │   ├── wins.js            ← Kazanç gönderme, onaylama, listeleme
│   │   ├── replay.js          ← ppreplaylink meta analizi (API key güvende)
│   │   └── users.js           ← Üye yönetimi
│   ├── middleware/
│   │   ├── auth.js            ← requireAdmin, requireMod, requireAuth
│   │   └── dataStore.js       ← JSON veri katmanı (DB'ye geçiş hazır)
│   └── data/                  ← JSON veri dosyaları (otomatik oluşur)
│       ├── sponsors.json
│       ├── wins.json
│       ├── pending.json
│       ├── users.json
│       ├── settings.json
│       ├── popup.json
│       └── social.json
│
├── frontend/                  ← Statik dosyalar (Express tarafından servis edilir)
│   ├── index.html             ← Ana sayfa
│   ├── css/
│   │   └── style.css          ← Tüm stiller
│   ├── js/
│   │   └── main.js            ← Tüm frontend JavaScript
│   └── assets/
│       └── images/            ← Sponsor logoları, favicon, görseller
│
├── package.json
├── .gitignore
└── README.md
```

---

## 🚀 Kurulum

### 1. Gereksinimler
- Node.js v18+ (https://nodejs.org)
- npm v8+

### 2. Bağımlılıkları Yükle
```bash
cd slotmaster
npm install
```

### 3. Ortam Değişkenlerini Ayarla
```bash
# backend/.env dosyasını düzenle
nano backend/.env
```

Şunları değiştir:
- `ADMIN_PASSWORD` → güçlü bir şifre
- `ADMIN_SECRET_KEY` → en az 32 karakter rastgele string
- `SESSION_SECRET` → en az 32 karakter rastgele string
- `ANTHROPIC_API_KEY` → Anthropic console'dan al

### 4. Sunucuyu Başlat
```bash
# Geliştirme modu (otomatik yeniden başlar)
npm run dev

# Production
npm start
```

### 5. Tarayıcıda Aç
- Site: http://localhost:3000
- Admin Panel: http://localhost:3000/#admin

---

## 🔐 Güvenlik Notları

### Admin Girişi
- Admin şifresi **hiçbir zaman** kaynak kodda bulunmaz
- `backend/.env` dosyasındadır, Git'e yükleme!
- Brute force koruması: 15 dakikada 10 deneme
- Oturum 8 saat sonra otomatik sona erer

### API Anahtarı
- Anthropic API anahtarı **sadece backend'de** kullanılır
- Frontend'den doğrudan Anthropic'e istek yapılmaz
- `/api/replay/analyze` endpoint'i güvenli proxy görevi görür

### Hassas Dosyalar
```
.gitignore içindekiler:
✅ .env           → asla paylaşma
✅ data/*.json    → kullanıcı verileri
✅ node_modules/  → gereksiz yük
```

---

## 🌐 Production'a Alma (VPS/Sunucu)

### 1. Sunucuya Yükle
```bash
# Sadece şu dosyaları yükle (node_modules ve .env dahil değil):
rsync -av --exclude='.env' --exclude='node_modules' --exclude='data' \
  ./ user@sunucu:/var/www/slotmaster/
```

### 2. Sunucuda Kurulum
```bash
cd /var/www/slotmaster
npm install --production
nano backend/.env  # .env'i manuel oluştur
npm start
```

### 3. PM2 ile Arka Planda Çalıştır (Önerilir)
```bash
npm install -g pm2
pm2 start backend/server.js --name slotmaster
pm2 save
pm2 startup
```

### 4. Nginx Reverse Proxy (Önerilir)
```nginx
server {
    listen 80;
    server_name siteadresi.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 5. SSL Sertifikası (Ücretsiz)
```bash
certbot --nginx -d siteadresi.com
```

---

## 📊 API Endpoints Özeti

| Method | Path | Yetki | Açıklama |
|--------|------|-------|----------|
| POST | /api/auth/admin-login | Public | Admin girişi |
| POST | /api/auth/register | Public | Üye kaydı |
| POST | /api/auth/login | Public | Üye girişi |
| GET | /api/auth/me | Public | Oturum kontrolü |
| GET | /api/sponsors | Public | Sponsor listesi |
| POST | /api/sponsors | Admin | Sponsor ekle |
| PUT | /api/sponsors/:id | Admin | Sponsor güncelle |
| DELETE | /api/sponsors/:id | Admin | Sponsor sil |
| GET | /api/wins | Public | Kazanç listesi |
| POST | /api/wins/submit | Public | Kazanç gönder |
| GET | /api/wins/pending | Mod | Bekleyen kazançlar |
| POST | /api/wins/:id/approve | Mod | Onayla |
| POST | /api/replay/analyze | Public | Link analizi |
| GET | /api/admin/stats | Admin | İstatistikler |
| PUT | /api/admin/settings | Admin | Ayarları kaydet |
| PUT | /api/admin/popup | Admin | Popup ayarları |

---

## 🔄 Veritabanına Geçiş (İleride)

Şu an JSON dosyaları kullanılıyor. Supabase/PostgreSQL'e geçmek için:

1. `backend/middleware/dataStore.js` dosyasını Prisma client'a dönüştür
2. `.env`'e `DATABASE_URL` ekle
3. Migration dosyalarını oluştur

---

## 🎨 Tema Sistemi

Admin Panel → Ayarlar → Tema'dan 5 tema seçilebilir:
- 🌙 Gece (Altın) — varsayılan
- 👑 Royal (Kırmızı)
- 💚 Emerald (Yeşil)
- 🌌 Galaxy (Mor)
- 💎 Platinum (Gümüş)

Her yayıncı kendi hostunda farklı tema kullanabilir.
