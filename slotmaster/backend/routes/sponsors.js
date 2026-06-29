// backend/routes/sponsors.js
const express = require('express');
const store   = require('../middleware/dataStore');
const { requireAdmin, requireMod } = require('../middleware/auth');

const router = express.Router();

// GET /api/sponsors — herkese açık
router.get('/', (req, res) => {
  res.json(store.getSponsors());
});

// POST /api/sponsors — admin ekler
router.post('/', requireAdmin, (req, res) => {
  const { name, link, bonus, img, ef, tag } = req.body;
  if (!name || !link) return res.status(400).json({ error: 'Ad ve link zorunlu.' });

  const sponsors = store.getSponsors();
  const newSp = { id: Date.now(), name, link, bonus: bonus||'', img: img||'', ef: ef||'ef-none', tag: tag||'' };
  sponsors.push(newSp);
  store.setSponsors(sponsors);
  res.status(201).json(newSp);
});

// PUT /api/sponsors/:id — admin günceller
router.put('/:id', requireAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  const sponsors = store.getSponsors();
  const idx = sponsors.findIndex(s => s.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Sponsor bulunamadı.' });

  sponsors[idx] = { ...sponsors[idx], ...req.body, id };
  store.setSponsors(sponsors);
  res.json(sponsors[idx]);
});

// DELETE /api/sponsors/:id — admin siler
router.delete('/:id', requireAdmin, (req, res) => {
  const id = parseInt(req.params.id);
  let sponsors = store.getSponsors();
  sponsors = sponsors.filter(s => s.id !== id);
  store.setSponsors(sponsors);
  res.json({ ok: true });
});

// PUT /api/sponsors/reorder — sıra güncelle
router.put('/reorder/all', requireAdmin, (req, res) => {
  const { order } = req.body; // [id, id, id, ...]
  if (!Array.isArray(order)) return res.status(400).json({ error: 'Geçersiz sıra.' });

  const sponsors = store.getSponsors();
  const reordered = order.map(id => sponsors.find(s => s.id === id)).filter(Boolean);
  // Eğer bazıları eksikse orijinalleri ekle
  sponsors.forEach(s => { if (!reordered.find(r => r.id === s.id)) reordered.push(s); });
  store.setSponsors(reordered);
  res.json({ ok: true });
});

// POST /api/sponsors/:id/click — kullanıcı tıklamasını logla
router.post('/:id/click', (req, res) => {
  const id      = parseInt(req.params.id);
  const userId  = req.session?.user?.id || null;
  const settings = store.getSettings();
  if (!settings.clicks) settings.clicks = {};
  const key = `sp_${id}`;
  settings.clicks[key] = (settings.clicks[key] || 0) + 1;
  // Kullanıcı bazlı loglama
  if (userId) {
    const users = store.getUsers();
    const usr   = users.find(u => u.id === userId);
    if (usr) {
      if (!usr.clicks) usr.clicks = {};
      const sponsors = store.getSponsors();
      const sp       = sponsors.find(s => s.id === id);
      if (sp) usr.clicks[sp.name] = (usr.clicks[sp.name] || 0) + 1;
      store.setUsers(users);
    }
  }
  store.setSettings(settings);
  res.json({ ok: true });
});

module.exports = router;
