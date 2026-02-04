// server.js
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the project root (includes index.html)
app.use(express.static(__dirname));

// ~1KB payload to simulate Teams media packet size
const pingPayload = 'OK' + 'x'.repeat(1020);

app.get('/ping', (req, res) => {
  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Surrogate-Control': 'no-store',
    'Content-Type': 'text/plain'
  });
  res.send(pingPayload);
});

// Serve index.html at root (fallback for SPA-like behavior)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Catch-all 404
app.use((req, res) => {
  res.status(404).send('Not found');
});

app.listen(port, () => {
  console.log(`Connectivity Check server running on port ${port}`);
});
