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
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 8 * 60 * 60 * 1000 }
}));

app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Replay analizi - API gerektirmez
app.post('/api/replay/analyze', async (req, res) => {
  const { url } = req.body;
  if (!url || !url.includes('ppreplaylink')) {
    return res.status(400).json({ error: 'Gecerli bir ppreplaylink.net linki gir.' });
  }
  try {
    const fetch = (await import('node-fetch')).default;
    const resp = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      timeout: 8000
    });
    const html = await resp.text();
    const titleMatch = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)
      || html.match(/<title>([^<]+)<\/title>/i);
    const imageMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
    const rawTitle = titleMatch ? titleMatch[1].trim() : '';
    const rawImage = imageMatch ? imageMatch[1].trim() : '';
    const clean = rawTitle.replace(/\s+Win\s*$/i, '').trim();
    const parts = clean.split(' ');
    const last = parts[parts.length - 1];
    let game = clean, multiplier = '';
    if (/^\d[\d.,]+x$/i.test(last)) { game = parts.slice(0, -1).join(' '); multiplier = last; }
    if (!game) return res.status(422).json({ error: 'Baslik okunamadi.' });
    res.json({ ok: true, game, multiplier, imageUrl: rawImage || '' });
  } catch (e) {
    res.status(500).json({ error: 'Analiz yapilamadi.', detail: e.message });
  }
});

// SPA - tüm route'ları index.html'e yönlendir
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('SlotMaster: http://0.0.0.0:' + PORT);
  console.log('Ortam: ' + (process.env.NODE_ENV || 'development'));
});
