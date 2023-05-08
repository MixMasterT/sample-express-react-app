const { Pool } = require('pg');

const pool = new Pool();

async function queryForNow() {
  const res = await pool.query('SELECT NOW()');
  console.log('inside queyrForNow func res: ', res);
  return res;
}

async function executeQuery(query) {
  const res = await pool.query(query);
  console.log('inside executeQuery func res: ', res);

  return res;
}

async function getDbClient() {
  return await pool.connect();
}

module.exports = {
  getDbClient,
  pool,
  queryForNow,
  executeQuery,
};
