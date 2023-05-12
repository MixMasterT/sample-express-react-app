const { Pool } = require('pg');

const { hashPassword, verifyPassword } = require('./password-tools');

const pool = new Pool();

async function queryForNow() {
  const res = await pool.query('SELECT NOW()');
  return res;
}

async function getUserByEmail(email) {
  const res = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email],
  );
  if (res.rows.length) {
    return res.rows[0];
  } else {
    return null;
  }
}

async function executeQuery(query) {
  try {
    const res = await pool.query(query);
    return res;
  } catch (error) {
    console.error('error executing query: ', error);
    throw new Error(`Error executing query: ${error}`);
  }
}

async function getDbClient() {
  return await pool.connect();
}

async function insertUser(user) {
  const { email, password } = user;
  
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      if (verifyPassword(password, existingUser)) {
        const { id, email } = existingUser;
        return { id, email };
      } 
      // password was not correct, so return null
      return null;
    }
    const { salt, hash } = hashPassword(password);
    const res = await pool.query(
      `INSERT INTO users (
        email, password_hash, password_salt
      ) VALUES ($1, $2, $3) RETURNING email`,
      [email, hash, salt.toString()],
    );
    return res.rows[0];
  } catch (error) {
    console.error('error inside insertUser func: ', error);
    return null;
  }
}

module.exports = {
  getDbClient,
  getUserByEmail,
  insertUser,
  pool,
  queryForNow,
  executeQuery,
};
