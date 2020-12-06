const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const routerUsers = require('./routes/user.route')
const routerCategories = require('./routes/category.route')
const routerRecords = require('./routes/record.route')
const routerTokens = require('./routes/tokens.routes')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());

app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,access_token');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(routerUsers)
app.use(routerCategories)
app.use(routerRecords)
app.use(routerTokens)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})