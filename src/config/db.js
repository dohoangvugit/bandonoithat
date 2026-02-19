const { Client } = require('pg');


const db = new Client({
    host: process.env.DB_HOST,
    port: 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
});

async function connect() {
    try {
        await db.connect();
        console.log(' Kết nối Supabase PostgreSQL thành công');
    } catch (err) {
        console.error(' Kết nối thất bại:', err);
    }
}

connect();

module.exports = db;
