const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
};

// Connected Real-Time Clients (Server-Sent Events)
let sseClients = [];

function broadcastRealtimeEvent(eventType, payload) {
  const data = JSON.stringify({
    type: eventType,
    payload,
    timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB'
  });
  
  sseClients = sseClients.filter(client => {
    try {
      client.write(`data: ${data}\n\n`);
      return true;
    } catch (e) {
      return false;
    }
  });
}

// In-Memory Shared Schedule State
let serverScheduleState = {
  virtualClock: '09:59',
  batch1OverdueAlertActive: false,
  lastAiRecommendation: null,
  issueHistory: []
};

const server = http.createServer((req, res) => {
  const urlParts = req.url.split('?');
  const reqPath = urlParts[0];

  // Set default CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  // --- Real-Time SSE Endpoint ---
  if (reqPath === '/api/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });
    res.write(`data: ${JSON.stringify({ type: 'CONNECTED', payload: { message: 'DairySync Real-Time Stream Connected' } })}\n\n`);
    sseClients.push(res);

    req.on('close', () => {
      sseClients = sseClients.filter(c => c !== res);
    });
    return;
  }

  // --- Broadcast Trigger Endpoint ---
  if (reqPath === '/api/broadcast' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body || '{}');
        broadcastRealtimeEvent(parsed.type || 'NOTIFICATION', parsed.payload || {});
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, clientCount: sseClients.length }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // --- Static Files Serving ---
  let filePath = path.join(__dirname, reqPath === '/' ? '/index.html' : reqPath);

  // Security check: prevent path traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    return res.end('Access denied');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      return res.end(`<h1>404 Not Found</h1><p>${reqPath}</p>`);
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });

    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`[DairySync AI] Real-Time Server running at http://localhost:${PORT}`);
  console.log(`[DairySync AI] SSE Real-time stream available at http://localhost:${PORT}/api/events`);
});
