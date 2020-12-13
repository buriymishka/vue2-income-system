const keys = require('./keys')
const Pool = require('pg').Pool
const pool = new Pool({
  user: keys.DB_USER,
  password: keys.DB_PASSWORD,
  host: keys.DB_HOST,
  port: keys.DB_PORT,
  database: keys.DB_DATABASE
})

module.exports = pool
