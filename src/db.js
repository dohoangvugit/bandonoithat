const { Client } = require('pg');

const db = new Client({
    host: 'aws-1-ap-northeast-2.pooler.supabase.com',
    port: 5432,
    user: 'postgres.dfethnntzsnzdldmjkne',
    password: 'Hoangvu123@',
    database: 'postgres',
    ssl: { rejectUnauthorized: false },
});

async function connect() {
    try {
        await db.connect();
        console.log(' Kết nối Supabase PostgreSQL thành công (POOLER)');
    } catch (err) {
        console.error(' Kết nối thất bại:', err);
    }
}

connect();

module.exports = db;
