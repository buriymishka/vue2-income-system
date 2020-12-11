const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const serveStatic = require('serve-static');
const cookieParser = require('cookie-parser');
const routerUsers = require('./routes/user.route')
const routerCategories = require('./routes/category.route')
const routerRecords = require('./routes/record.route')
const routerTokens = require('./routes/tokens.routes')
const app = express()
const port = process.env.PORT || 3000
const hostname = process.env.HOST || 'localhost'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());

app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', 'https://mihail-vue-crm.herokuapp.com/'); // 3000 http://localhost:8080
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,access_token');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(routerUsers)
app.use(routerCategories)
app.use(routerRecords)
app.use(routerTokens)

app.use('/css', express.static(path.resolve(__dirname, '../dist/css')));
app.use('/js', express.static(path.resolve(__dirname, '../dist/js')));
app.use('/img', express.static(path.resolve(__dirname, '../dist/img')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// app.listen(port, hostname, () => {
//   console.log('server started')
// })