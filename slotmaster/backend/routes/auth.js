// backend/routes/auth.js
// Admin ve üye kimlik doğrulama rotaları

const express  = require('express');
const bcrypt   = require('bcryptjs');
const store    = require('../middleware/dataStore');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// ─── ADMIN GİRİŞ ──────────────────────────────────
// POST /api/auth/admin-login
router.post('/admin-login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Kullanıcı adı ve şifre zorunlu.' });
  }

  // .env'den admin bilgilerini al — kaynak kodda ASLA şifre yok
  const adminUser = process.env.ADMIN_USERNAME;
  const adminPass = process.env.ADMIN_PASSWORD;
  const modUser   = process.env.MOD_USERNAME;
  const modPass   = process.env.MOD_PASSWORD;

  let role = null;

  if (username === adminUser && password === adminPass) {
    role = 'admin';
  } else if (username === modUser && password === modPass) {
    role = 'moderator';
  } else {
    // Kaba kuvvet saldırısını zorlaştırmak için sabit gecikme
    await new Promise(r => setTimeout(r, 1000));
    return res.status(401).json({ error: 'Kullanıcı adı veya şifre hatalı.' });
  }

  // Session'a yaz
  req.session.user = { username, role, loginAt: Date.now() };

  res.json({ 
    ok: true, 
    role, 
    username,
    message: `Hoş geldin, ${username}! (${role})`
  });
});

// ─── ÜYE KAYIT ────────────────────────────────────
// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { username, password, phone } = req.body;

  if (!username || !password || !phone) {
    return res.status(400).json({ error: 'Tüm alanlar zorunlu.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Şifre en az 6 karakter olmalı.' });
  }

  const users = store.getUsers();
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ error: 'Bu kullanıcı adı alınmış.' });
  }

  const hash = await bcrypt.hash(password, 12);
  const newUser = {
    id:       Date.now(),
    username,
    phone,
    password: hash,  // Hiçbir zaman düz metin kaydetme
    role:     'user',
    createdAt: new Date().toISOString(),
    clicks:   {}
  };

  users.push(newUser);
  store.setUsers(users);

  // Session'a yaz (kayıt = otomatik giriş)
  req.session.user = { id: newUser.id, username, role: 'user' };

  res.status(201).json({ ok: true, username, message: 'Kayıt başarılı.' });
});

// ─── ÜYE GİRİŞ ───────────────────────────────────
// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Kullanıcı adı ve şifre zorunlu.' });
  }

  const users = store.getUsers();
  const user  = users.find(u => u.username === username);

  if (!user) {
    await new Promise(r => setTimeout(r, 800));
    return res.status(401).json({ error: 'Hatalı kullanıcı adı veya şifre.' });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    await new Promise(r => setTimeout(r, 800));
    return res.status(401).json({ error: 'Hatalı kullanıcı adı veya şifre.' });
  }

  req.session.user = { id: user.id, username, role: user.role };
  res.json({ ok: true, username, role: user.role });
});

// ─── OTURUM KONTROLÜ ──────────────────────────────
// GET /api/auth/me
router.get('/me', (req, res) => {
  if (!req.session.user) return res.json({ loggedIn: false });
  res.json({ loggedIn: true, ...req.session.user });
});

// ─── ÇIKIŞ ────────────────────────────────────────
// POST /api/auth/logout
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ ok: true });
});

// ─── ŞİFRE SIFIRLAMA (Admin onaylı) ──────────────
// POST /api/auth/forgot
router.post('/forgot', async (req, res) => {
  const { username, phone } = req.body;
  const users = store.getUsers();
  const user  = users.find(u => u.username === username && u.phone === phone);

  if (!user) {
    return res.status(404).json({ error: 'Bu bilgilerle eşleşen hesap bulunamadı.' });
  }

  // Gerçek uygulamada: SMS/email gönder
  // Şimdilik: admin reset talebini kaydet
  const settings = store.getSettings();
  if (!settings.resetRequests) settings.resetRequests = [];
  settings.resetRequests.push({
    userId: user.id,
    username,
    requestedAt: new Date().toISOString()
  });
  store.setSettings(settings);

  res.json({ ok: true, message: 'Sıfırlama talebi admin\'e iletildi.' });
});

module.exports = router;
