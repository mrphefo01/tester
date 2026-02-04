// server.js - Serves static files and a ~1KB ping response

const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the project directory
app.use(express.static(__dirname));

// ~1KB payload (1024 characters) to simulate Teams media packet size
const pingPayload = 'OK' + 'x'.repeat(1020); // Exactly ~1024 bytes when encoded

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

// Serve index.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 fallback
app.use((req, res) => {
  res.status(404).send('Not found');
});

app.listen(port, () => {
  console.log(`Connectivity Check server running on port ${port}`);
});
