// backend/routes/users.js
const express = require('express');
const store   = require('../middleware/dataStore');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/users — sadece admin
router.get('/', requireAdmin, (req, res) => {
  const users = store.getUsers().map(u => ({
    id:        u.id,
    username:  u.username,
    phone:     u.phone,
    role:      u.role,
    createdAt: u.createdAt,
    clicks:    u.clicks || {}
    // password alanı HİÇBİR ZAMAN gönderilmez
  }));
  res.json(users);
});

// DELETE /api/users/:id
router.delete('/:id', requireAdmin, (req, res) => {
  const id    = parseInt(req.params.id);
  let users   = store.getUsers();
  users       = users.filter(u => u.id !== id);
  store.setUsers(users);
  res.json({ ok: true });
});

// GET /api/users/popup — herkes için popup ayarları
router.get('/popup-public', (req, res) => {
  const popup = store.getPopup();
  // Aktif değilse boş dön
  if (!popup.active) return res.json({ active: false });
  // Sponsor detaylarını ekle
  const sponsors = store.getSponsors();
  const popupSps = (popup.sponsors || [])
    .map(id => sponsors.find(s => s.id === id))
    .filter(Boolean)
    .slice(0, 3);
  res.json({ ...popup, sponsorDetails: popupSps });
});

module.exports = router;
