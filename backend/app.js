const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();
const path = require('path');
const userRoutes = require('./routes/user');

const db = mysql.createConnection({
    database: "groupomania",
    host: "localhost",
    user: "root",
    password: "l5u6f5f6yrrn"
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use(helmet());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);

module.exports = app;