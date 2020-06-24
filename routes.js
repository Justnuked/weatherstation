const express = require('express');
const routes = express.Router();
const controller = require('./weatherController');

routes.post('/weather', controller.save);

module.exports = routes;