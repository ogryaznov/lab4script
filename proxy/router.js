const express = require("express");
const router = express.Router();
var config = require('./config.js');

router.get("/", function (req, res) {
	res.redirect(301, config.get('url'));
});

module.exports = router;