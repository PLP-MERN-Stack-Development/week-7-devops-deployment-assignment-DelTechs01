const express = require('express');
const router = express.Router();

router.get('/metrics', async (req, res) => {
  const metrics = {
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString(),
    activeConnections: mongoose.connection.db.serverConfig.poolSize
  };
  res.json(metrics);
});

module.exports = router;