const express = require('express');
const apiRouter = require('./api');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'utkrusht-booking-api' });
});

router.use('/api', apiRouter);

module.exports = router;
