const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const HTML = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const server = http.createServer((req, res) => {
  // API endpoint
  if (req.method === 'POST' && req.url === '/api/replay/analyze') {
    let body = '';
    req.on('data', d => body += d);
    req.on('end', async () => {
      try {
        const { url } = JSON.parse(body);
        if (!url || !url.includes('ppreplaylink')) {
          res.writeHead(400, {'Content-Type':'application/json'});
          return res.end(JSON.stringify({error:'Gecersiz link'}));
        }
        const fetch = (await import('node-fetch')).default;
        const resp = await fetch(url, {headers:{'User-Agent':'Mozilla/5.0'}, timeout:8000});
        const html = await resp.text();
        const tm = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)
                || html.match(/<title>([^<]+)<\/title>/i);
        const im = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
        const raw = tm ? tm[1].trim() : '';
        const clean = raw.replace(/\s+Win\s*$/i, '').trim();
        const parts = clean.split(' ');
        const last = parts[parts.length-1];
        let game = clean, multiplier = '';
        if (/^\d[\d.,]+x$/i.test(last)) { game = parts.slice(0,-1).join(' '); multiplier = last; }
        if (!game) { res.writeHead(422,{'Content-Type':'application/json'}); return res.end(JSON.stringify({error:'Baslik okunamadi'})); }
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify({ok:true, game, multiplier, imageUrl: im ? im[1].trim() : ''}));
      } catch(e) {
        res.writeHead(500,{'Content-Type':'application/json'});
        res.end(JSON.stringify({error:e.message}));
      }
    });
    return;
  }

  // Her şey index.html
  res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
  res.end(HTML);
});

server.listen(PORT, '0.0.0.0', () => console.log('SlotMaster: ' + PORT));
