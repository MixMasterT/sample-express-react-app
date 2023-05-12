const express = require('express');
const router = express.Router();

const { executeQuery } = require('../db/pg_connection');

router.get('/protected', (req, res) => {
  res.send('Hello secret cat!')
});

router.get('/all-pets', async (req, res) => {
  const query = `
    SELECT * FROM pets;
  `;
  const pets = await executeQuery(query);
  res.status(200).send(pets.rows);
});

module.exports = router;