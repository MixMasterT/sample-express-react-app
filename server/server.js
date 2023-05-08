const express = require('express');
const app = express();
const { queryForNow } = require('./pg_connection');
// const { connectToDB } = require('./mssql_server_db_connection');
const port = process.env.SERVER_PORT_INTERNAL || 8888;

app.get('/', (req, res) => {
  res.send('Hello cat!')
});

app.get('/ping', async (req, res) => {
  
  // connectToDB();
  const now = await queryForNow();
  res.status(200).send(`pong from server : ${now.rows[0].now }`); 
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
