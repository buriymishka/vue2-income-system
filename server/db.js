const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  password: 'root',
  host: 'localhost',
  port: 5432,
  database: 'vue_crm'
})
// const pool = new Pool({
//   user: 'pdvcmiqeitnruf',
//   password: '31a1d99a0767e45a26a42d05d2fd2d2e161d646142c53b57e22e5c4e3bcdf757',
//   host: 'ec2-54-170-100-209.eu-west-1.compute.amazonaws.com',
//   port: 5432,
//   database: 'df714vqie02uek'
// })

module.exports = pool
