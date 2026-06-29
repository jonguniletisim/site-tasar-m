// ═══════════════════════════════════════════════════
// SlotMaster — Ana Sunucu (backend/server.js)
// ═══════════════════════════════════════════════════
require('dotenv').config({ path: __dirname + '/.env' });

const express     = require('express');
const session     = require('express-session');
const cors        = require('cors');
const helmet      = require('helmet');
const rateLimit   = require('express-rate-limit');
const path        = require('path');

const authRoutes    = require('./routes/auth');
const adminRoutes   = require('./routes/admin');
const sponsorRoutes = require('./routes/sponsors');
const winsRoutes    = require('./routes/wins');
const replayRoutes  = require('./routes/replay');
const userRoutes    = require('./routes/users');

const app  = express();
const PORT = process.env.PORT || 3000;

// ─── GÜVENLİK ─────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc:  ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
      styleSrc:   ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
      fontSrc:    ["'self'", "fonts.gstatic.com"],
      imgSrc:     ["'self'", "data:", "https:", "blob:"],
      frameSrc:   ["'self'", "www.ppreplaylink.net"],
      connectSrc: ["'self'", "api.anthropic.com"],
    }
  }
}));

// ─── CORS ──────────────────────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(',');
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) cb(null, true);
    else cb(new Error('CORS: İzin verilmeyen kaynak'));
  },
  credentials: true
}));

// ─── RATE LIMITING ─────────────────────────────────
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 10,
  message: { error: 'Çok fazla giriş denemesi. 15 dakika bekle.' }
});
const apiLimiter = rateLimit({ windowMs: 60 * 1000, max: 100 });

// ─── BODY PARSER ───────────────────────────────────
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── SESSION ───────────────────────────────────────
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret_degistir',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 8 * 60 * 60 * 1000  // 8 saat
  }
}));

// ─── STATİK DOSYALAR ───────────────────────────────
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// ─── ROTALAR ───────────────────────────────────────
app.use('/api/auth',    loginLimiter, authRoutes);
app.use('/api/admin',   adminRoutes);
app.use('/api/sponsors',sponsorRoutes);
app.use('/api/wins',    winsRoutes);
app.use('/api/replay',  replayRoutes);
app.use('/api/users',   userRoutes);
app.use('/api',         apiLimiter);

// ─── ANA SAYFA ─────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// ─── HATA YÖNETİMİ ─────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[Hata]', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Sunucu hatası' });
});

// ─── BAŞLAT ────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ SlotMaster sunucu çalışıyor: http://localhost:${PORT}`);
  console.log(`   Ortam: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Admin panel: http://localhost:${PORT}/#admin`);
});

module.exports = app;
