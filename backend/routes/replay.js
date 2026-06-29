// backend/routes/replay.js
// ppreplaylink.net meta analizi — API anahtarı backend'de güvende

const express = require('express');
const router  = express.Router();

// POST /api/replay/analyze
router.post('/analyze', async (req, res) => {
  const { url } = req.body;
  if (!url || !url.includes('ppreplaylink')) {
    return res.status(400).json({ error: 'Geçerli bir ppreplaylink.net linki gir.' });
  }

  try {
    const fetch = (await import('node-fetch')).default;
    const resp  = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':    'application/json',
        'x-api-key':       process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model:      'claude-sonnet-4-6',
        max_tokens: 200,
        messages: [{
          role:    'user',
          content: `ppreplaylink URL: ${url}\nFormat: "OYUN_ADI ÇARPANx Win"\nSadece JSON: {"game":"oyun adı","multiplier":"5008x","imageUrl":"https://www.ppreplaylink.net/game_pic/vs20fruitswx.jpg"}`
        }]
      })
    });

    const data   = await resp.json();
    const text   = data.content?.map(c => c.text || '').join('').replace(/```json|```/g,'').trim();
    const parsed = JSON.parse(text);
    res.json({ ok: true, ...parsed });
  } catch (e) {
    res.status(500).json({ error: 'Analiz yapılamadı.', detail: e.message });
  }
});

module.exports = router;
