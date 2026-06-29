// backend/routes/wins.js
const express = require('express');
const store   = require('../middleware/dataStore');
const { requireAdmin, requireMod, requireAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/wins — herkese açık
router.get('/', (req, res) => {
  res.json(store.getWins());
});

// GET /api/wins/pending — sadece mod/admin
router.get('/pending', requireMod, (req, res) => {
  res.json(store.getPending());
});

// POST /api/wins/submit — üye veya anonim kazanç gönderir
router.post('/submit', async (req, res) => {
  const { replayLink, sponsorName } = req.body;
  if (!replayLink) return res.status(400).json({ error: 'Replay linki zorunlu.' });

  // Linki Anthropic API ile analiz et (server-side)
  let game = '—', mul = '—', img = '';
  try {
    const fetch = (await import('node-fetch')).default;
    const resp  = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 200,
        messages: [{
          role: 'user',
          content: `ppreplaylink URL: ${replayLink}\nFormat: "OYUN_ADI ÇARPANx Win"\nSadece JSON: {"game":"oyun adı","multiplier":"5008x","imageUrl":"https://www.ppreplaylink.net/game_pic/vs20fruitswx.jpg"}`
        }]
      })
    });
    const data = await resp.json();
    const text = data.content?.map(c => c.text || '').join('').replace(/```json|```/g,'').trim();
    const parsed = JSON.parse(text);
    game = parsed.game || '—';
    mul  = parsed.multiplier || '—';
    img  = parsed.imageUrl || '';
  } catch(e) {
    console.warn('Replay analiz hatası:', e.message);
  }

  const loggedUser = req.session?.user || null;
  const pending    = store.getPending();

  const entry = {
    id:        Date.now(),
    user:      loggedUser?.username || 'Anonim',
    userId:    loggedUser?.id || null,
    loggedIn:  !!loggedUser,
    game,
    mul,
    img,
    link:      replayLink,
    sponsor:   sponsorName || '',
    date:      new Date().toLocaleDateString('tr-TR'),
    siteV:     '',
    prizeEl:   false,
    status:    'pending'
  };

  pending.push(entry);
  store.setPending(pending);

  res.status(201).json({ ok: true, message: 'Kazancın admin onayına gönderildi.' });
});

// POST /api/wins/:id/approve — admin onaylar
router.post('/:id/approve', requireMod, (req, res) => {
  const id      = parseInt(req.params.id);
  const pending = store.getPending();
  const idx     = pending.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Bekleyen kazanç bulunamadı.' });

  const approved = { ...pending[idx], status: 'approved', approvedAt: new Date().toISOString() };
  pending.splice(idx, 1);
  store.setPending(pending);

  const wins = store.getWins();
  wins.unshift(approved);
  store.setWins(wins);

  res.json({ ok: true, win: approved });
});

// POST /api/wins/:id/reject — admin reddeder
router.post('/:id/reject', requireMod, (req, res) => {
  const id      = parseInt(req.params.id);
  let pending   = store.getPending();
  pending       = pending.filter(p => p.id !== id);
  store.setPending(pending);
  res.json({ ok: true });
});

// POST /api/wins — admin manuel ekler
router.post('/', requireAdmin, (req, res) => {
  const { user, game, mul, img, link, sponsor } = req.body;
  if (!game) return res.status(400).json({ error: 'Oyun adı zorunlu.' });

  const wins  = store.getWins();
  const entry = {
    id:      Date.now(),
    user:    user || 'Admin',
    game,
    mul:     mul || '—',
    img:     img || '',
    link:    link || '#',
    sponsor: sponsor || '',
    date:    new Date().toLocaleDateString('tr-TR'),
    status:  'approved'
  };
  wins.unshift(entry);
  store.setWins(wins);
  res.status(201).json(entry);
});

// DELETE /api/wins/:id — admin siler
router.delete('/:id', requireAdmin, (req, res) => {
  const id   = parseInt(req.params.id);
  let wins   = store.getWins();
  wins       = wins.filter(w => w.id !== id);
  store.setWins(wins);
  res.json({ ok: true });
});

module.exports = router;
