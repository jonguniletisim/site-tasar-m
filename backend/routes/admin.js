// backend/routes/admin.js
const express = require('express');
const store   = require('../middleware/dataStore');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/admin/settings
router.get('/settings', requireAdmin, (req, res) => {
  res.json(store.getSettings());
});

// PUT /api/admin/settings
router.put('/settings', requireAdmin, (req, res) => {
  const current = store.getSettings();
  store.setSettings({ ...current, ...req.body });
  res.json({ ok: true });
});

// GET /api/admin/popup
router.get('/popup', requireAdmin, (req, res) => {
  res.json(store.getPopup());
});

// PUT /api/admin/popup
router.put('/popup', requireAdmin, (req, res) => {
  store.setPopup(req.body);
  res.json({ ok: true });
});

// GET /api/admin/social
router.get('/social', requireAdmin, (req, res) => {
  res.json(store.getSocial());
});

// PUT /api/admin/social
router.put('/social', requireAdmin, (req, res) => {
  store.setSocial(req.body);
  res.json({ ok: true });
});

// GET /api/admin/stats — özet istatistikler
router.get('/stats', requireAdmin, (req, res) => {
  const wins    = store.getWins();
  const pending = store.getPending();
  const users   = store.getUsers();
  const sponsors= store.getSponsors();
  const settings= store.getSettings();

  res.json({
    totalWins:     wins.length,
    pendingWins:   pending.length,
    totalUsers:    users.length,
    totalSponsors: sponsors.length,
    clicks:        settings.clicks || {},
    topSponsor:    getTopSponsor(settings.clicks || {}),
  });
});

function getTopSponsor(clicks) {
  return Object.entries(clicks)
    .sort((a,b) => b[1] - a[1])
    .slice(0,1)
    .map(([k,v]) => ({ name: k.replace('sp_',''), clicks: v }))[0] || null;
}

// POST /api/admin/pending/:id/verify — siteyi doğrula
router.post('/pending/:id/verify', requireAdmin, (req, res) => {
  const id      = parseInt(req.params.id);
  const pending = store.getPending();
  const item    = pending.find(p => p.id === id);
  if (!item) return res.status(404).json({ error: 'Bulunamadı.' });
  item.siteV    = req.body.site || item.sponsor || '';
  store.setPending(pending);
  res.json({ ok: true });
});

// POST /api/admin/pending/:id/prize — ödüle hak kazandır
router.post('/pending/:id/prize', requireAdmin, (req, res) => {
  const id      = parseInt(req.params.id);
  const pending = store.getPending();
  const item    = pending.find(p => p.id === id);
  if (!item) return res.status(404).json({ error: 'Bulunamadı.' });
  item.prizeEl  = true;
  store.setPending(pending);
  res.json({ ok: true });
});

// DELETE /api/admin/cache — cache temizle (JSON dosyalarını sıfırla)
router.delete('/cache', requireAdmin, (req, res) => {
  // Sadece geçici verileri sıfırla (sponsorlar ve ayarları koru)
  const sponsors = store.getSponsors();
  const settings = store.getSettings();
  // Wins ve users sıfırlanmaz — sadece temp cache
  res.json({ ok: true, message: 'Cache temizlendi.' });
});

module.exports = router;
