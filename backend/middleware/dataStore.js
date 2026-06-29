// backend/middleware/dataStore.js
// JSON tabanlı veri katmanı — veritabanı kurulana kadar.
// İleride bu dosyayı Prisma/Supabase client'a dönüştür.

const fs   = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

// Klasörü oluştur
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

function filePath(name) {
  return path.join(DATA_DIR, `${name}.json`);
}

function read(name, defaultVal = []) {
  try {
    const raw = fs.readFileSync(filePath(name), 'utf8');
    return JSON.parse(raw);
  } catch {
    return defaultVal;
  }
}

function write(name, data) {
  fs.writeFileSync(filePath(name), JSON.stringify(data, null, 2), 'utf8');
}

// ─── VERİ YARDIMCILARI ───────────────────────────
const store = {
  // Sponsorlar
  getSponsors: ()      => read('sponsors', []),
  setSponsors: (data)  => write('sponsors', data),

  // Kazançlar
  getWins:     ()      => read('wins', []),
  setWins:     (data)  => write('wins', data),

  // Bekleyen kazançlar
  getPending:  ()      => read('pending', []),
  setPending:  (data)  => write('pending', data),

  // Üyeler (şifreler hash'li tutulur)
  getUsers:    ()      => read('users', []),
  setUsers:    (data)  => write('users', data),

  // Site ayarları
  getSettings: ()      => read('settings', {}),
  setSettings: (data)  => write('settings', data),

  // Popup ayarları
  getPopup:    ()      => read('popup', { active: false, title: '', sub: '', sponsors: [] }),
  setPopup:    (data)  => write('popup', data),

  // Sosyal kanallar
  getSocial:   ()      => read('social', []),
  setSocial:   (data)  => write('social', data),
};

module.exports = store;
