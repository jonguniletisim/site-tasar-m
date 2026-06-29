require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'slotmaster2026',
  resave: false, saveUninitialized: false,
  cookie: { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 8*60*60*1000 }
}));
app.use(express.static(path.join(__dirname, '..', 'frontend')));
app.post('/api/replay/analyze', async (req, res) => {
  const { url } = req.body;
  if (!url || !url.includes('ppreplaylink')) return res.status(400).json({ error: 'Gecersiz link' });
  try {
    const fetch = (await import('node-fetch')).default;
    const resp = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 8000 });
    const html = await resp.text();
    const tm = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i) || html.match(/<title>([^<]+)<\/title>/i);
    const im = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
    const raw = tm ? tm[1].trim() : '';
    const clean = raw.replace(/\s+Win\s*$/i, '').trim();
    const parts = clean.split(' ');
    const last = parts[parts.length-1];
    let game = clean, multiplier = '';
    if (/^\d[\d.,]+x$/i.test(last)) { game = parts.slice(0,-1).join(' '); multiplier = last; }
    if (!game) return res.status(422).json({ error: 'Baslik okunamadi' });
    res.json({ ok: true, game, multiplier, imageUrl: im ? im[1].trim() : '' });
  } catch(e) { res.status(500).json({ error: e.message }); }
});
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html')));
app.listen(PORT, '0.0.0.0', () => console.log('SlotMaster: ' + PORT));
