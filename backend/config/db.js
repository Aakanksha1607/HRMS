// db.js
const postgres = require('postgres');
require('dotenv').config();

const sql = postgres(process.env.DATABASE_URL, {
  ssl: {
    require: true,
    rejectUnauthorized: false, // Important for Supabase SSL
  },
});

module.exports = sql;
