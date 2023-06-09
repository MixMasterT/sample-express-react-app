/* NOTE: This file is not being used in this sample app. It is here for reference only. */
const sql = require('mssql');

const sqlConfig = {
  user: process.env.MSSQL_USER,
  password: process.env.MSSQL_SA_PASSWORD,
  database: process.env.MSSQL_DB_NAME,
  server: 'db',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}

async function connectToDB() {
 try {
  // make sure that any items are correctly URL encoded in the connection string
  await sql.connect(sqlConfig)
  const result = await sql.query`SELECT Name FROM sys.Databases;`
  console.log(result);
  return sql;
 } catch (err) {
  console.log('error - db access failed!', err);
 }
}

module.exports = {
  connectToDB,
};
