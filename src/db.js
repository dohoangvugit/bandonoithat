const { Client } = require('pg');

const db = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'emiuemiu',
    database: 'bandonoithat',
});

async function connect() {
  try {
    await db.connect();
    console.log('Kết nối PostgreSQL thành công');
  } catch (err) {
    console.error(' Kết nối PostgreSQL thất bại', err.message);
    process.exit(1);
  }
}

connect()

module.exports = db;
