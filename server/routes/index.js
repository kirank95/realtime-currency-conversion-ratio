const routes = require('express').Router();

const currency = require('../src/controllers/CurrencyController');

routes.use('/currency', currency);

module.exports = routes;