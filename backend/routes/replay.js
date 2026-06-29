// backend/routes/replay.js
// ppreplaylink.net meta analizi — API gerektirmez, sunucu tarafı scraping

const express = require('express');
const router  = express.Router();

// Oyun adından görsel URL üret
function getImageUrl(gameSlug) {
  // ppreplaylink.net'in görsel formatı: /game_pic/SLUG.jpg
  return 'https://www.ppreplaylink.net/game_pic/' + gameSlug + '.jpg';
}

// og:title'dan oyun adı ve çarpanı parse et
// Örnek: "Sweet Bonanza 1000 3056x Win" → game: "Sweet Bonanza 1000", mul: "3056x"
function parseTitle(title) {
  if (!title) return { game: '', multiplier: '' };
  // " Win" suffix'ini kaldır
  const clean = title.replace(/\s+Win\s*$/i, '').trim();
  // Son token "Nx" formatındaysa çarpan
  const parts = clean.split(' ');
  const last = parts[parts.length - 1];
  if (/^\d[\d.,]+x$/i.test(last)) {
    return {
      game: parts.slice(0, -1).join(' '),
      multiplier: last
    };
  }
  return { game: clean, multiplier: '' };
}

// og:image URL'den game slug çıkar
// Örnek: https://www.ppreplaylink.net/game_pic/vs20fruitswx.jpg → vs20fruitswx
function parseImageSlug(imgUrl) {
  if (!imgUrl) return '';
  const m = imgUrl.match(/game_pic\/([^.]+)\./);
  return m ? m[1] : '';
}

// POST /api/replay/analyze
router.post('/analyze', async (req, res) => {
  const { url } = req.body;

  if (!url || !url.includes('ppreplaylink')) {
    return res.status(400).json({ error: 'Geçerli bir ppreplaylink.net linki gir.' });
  }

  try {
    // node-fetch ile ppreplaylink sayfasını çek (sunucu tarafı = CORS yok)
    const fetch = (await import('node-fetch')).default;

    const resp = await fetch(url, {
      headers: {
        // Tarayıcı gibi davran
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'tr-TR,tr;q=0.9,en;q=0.8',
      },
      timeout: 8000,
      redirect: 'follow',
    });

    const html = await resp.text();

    // og:title çek
    const titleMatch = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:title["']/i)
      || html.match(/<title>([^<]+)<\/title>/i);

    // og:image çek
    const imageMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);

    const rawTitle = titleMatch ? titleMatch[1].trim() : '';
    const rawImage = imageMatch ? imageMatch[1].trim() : '';

    const { game, multiplier } = parseTitle(rawTitle);
    const imageUrl = rawImage || getImageUrl('vs20fruitswx'); // fallback

    if (!game) {
      return res.status(422).json({ error: 'Sayfa başlığı okunamadı.', rawTitle });
    }

    res.json({
      ok: true,
      game,
      multiplier,
      imageUrl,
      rawTitle,
    });

  } catch (e) {
    // Sunucu fetch başarısız olursa — API anahtarı varsa onu dene
    if (process.env.ANTHROPIC_API_KEY) {
      try {
        const fetch2 = (await import('node-fetch')).default;
        const resp2 = await fetch2('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 150,
            messages: [{
              role: 'user',
              content: `ppreplaylink URL: ${url}\nSadece JSON: {"game":"oyun adı","multiplier":"5008x","imageUrl":"https://www.ppreplaylink.net/game_pic/vs20fruitswx.jpg"}`
            }]
          })
        });
        const data = await resp2.json();
        const text = data.content?.map(c => c.text || '').join('').replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(text);
        return res.json({ ok: true, ...parsed });
      } catch (e2) {
        // fall through
      }
    }

    res.status(500).json({
      error: 'Link analiz edilemedi. Manuel giriş yapabilirsiniz.',
      detail: e.message
    });
  }
});

module.exports = router;
