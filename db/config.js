const pgp = require('pg-promise')();

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'project2',
  user: 'yvelinesay'
}

const db = pgp(process.env.DATABASE_URL || cn); // cn is the configuration object
module.exports = db;
