const express = require('express');

const UserController = require('../app/controllers/UserController');

let router = express.Router();

new UserController().createHtmlRoutes(router);

module.exports = router;