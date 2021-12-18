const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();
const path = require('path');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(helmet());

app.use('/medias', express.static(path.join(__dirname, 'medias')));

app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);

const db = require("./models");
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  require('./config/admin');
});


module.exports = app;