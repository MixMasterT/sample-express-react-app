const fs = require('fs');
const { promisify } = require('util');
const { getDbClient } = require('../pg_connection');   

async function runMigrations() {
  const files = await promisify(fs.readdir)('./db/migrations');
  const migrations = files.filter((file) => file.split(".")[1] === "sql");
  const migrationSqlStatements = migrations.map((migration) => {
    return fs.readFileSync(`./db/migrations/${migration}`, 'utf8');
  });
  const client = await getDbClient();
  let failedQuery = null;
  // run migrations inside of a transactions
  try {
    console.log('running db migrations...');
    await client.query('BEGIN'); 
    for (let migration of migrationSqlStatements) {
      failedQuery = migration;
      await client.query(migration);
      failedQuery = null;
    }
    await client.query('COMMIT');
    console.log('db migrations complete');
  } catch (err) {
    console.log('db migrations failed: ', err, '\nfailed query: ', failedQuery);
  } finally {
    client.release();
  }
}

module.exports = {
  runMigrations,
};
