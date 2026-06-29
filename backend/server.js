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

// CORS — herkese izin ver
app.use(cors({ origin: true, credentials: true }));

// Güvenlik
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc:  ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
      styleSrc:   ["'self'", "'unsafe-inline'", "fonts.googleapis.com", "fonts.gstatic.com"],
      fontSrc:    ["'self'", "fonts.gstatic.com"],
      imgSrc:     ["'self'", "data:", "https:", "blob:"],
      frameSrc:   ["'self'", "www.ppreplaylink.net", "ppreplaylink.net"],
      connectSrc: ["'self'", "https:", "http:"],
    }
  }
}));

// Rate limit
const loginLimiter = rateLimit({ windowMs: 15*60*1000, max: 20 });
const apiLimiter   = rateLimit({ windowMs: 60*1000, max: 200 });

// Body
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'slotmaster_secret_2026',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 8 * 60 * 60 * 1000
  }
}));

// Statik dosyalar
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// API rotaları
app.use('/api/auth',     loginLimiter, authRoutes);
app.use('/api/admin',    adminRoutes);
app.use('/api/sponsors', sponsorRoutes);
app.use('/api/wins',     winsRoutes);
app.use('/api/replay',   replayRoutes);
app.use('/api/users',    userRoutes);
app.use('/api',          apiLimiter);

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// Hata
app.use((err, req, res, next) => {
  console.error('[Hata]', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Sunucu hatası' });
});

// Başlat
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ SlotMaster: http://0.0.0.0:${PORT}`);
  console.log(`   Ortam: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
