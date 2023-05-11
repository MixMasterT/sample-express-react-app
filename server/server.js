const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const publicRoutes = require('./routes/public');
const protectedRoutes = require('./routes/protected');
const { queryForNow } = require('./db/pg_connection');
require('./passport-setup');

// const { runMigrations } = require('./db/migrations');
// const { connectToDB } = require('./mssql_server_db_connection');
const port = process.env.SERVER_PORT_INTERNAL || 8888;

const app = express();
// expect application/json content-type
app.use(bodyParser.json());

// allow cross-origin requests
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello cat!')
});

app.get('/ping', async (req, res) => {
  
  // connectToDB();
  const now = await queryForNow();
  res.status(200).send(`pong from server : ${now.rows[0].now }`); 
});

app.use('/public', publicRoutes);
app.use('/protected', [cors(), passport.authenticate('jwt', {session: false})], protectedRoutes);
// runMigrations();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
