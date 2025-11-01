const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Your API key - kept secret on the server
const API_KEY = "qPVea8k3mByNesKa";

// Serve your static website files
app.use(express.static(__dirname));

// API endpoint to get status (hides your real API key)
app.get('/api/status', async (req, res) => {
  try {
    // Use dynamic import for fetch in Node.js
    const fetch = (await import('node-fetch')).default;
    
    const response = await fetch(`https://api.torn.com/user/?selections=profile&key=${API_KEY}`);
    const data = await response.json();
    
    if (data.error) {
      return res.status(400).json({ error: data.error.error });
    }
    
    // Only send back the status, not the full API response
    res.json({ 
      status: data.last_action?.status || "Unknown",
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📊 API status endpoint: http://localhost:${PORT}/api/status`);
});