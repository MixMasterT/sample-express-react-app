const express = require('express');
const router = express.Router();

router.get('/protected', (req, res) => {
  res.send('Hello secret cat!')
});

module.exports = router;