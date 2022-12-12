const express = require('express');
const app = express();
const router = require('./router.js');
var config = require('./config.js');

app.use("/", router);

module.exports = app;